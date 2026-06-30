<?php
/**
 * Paste this into your active theme's functions.php or a site-specific mu-plugin.
 * It adds an English Title field for the Lesson CPT and exposes it through REST.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {
    register_post_meta('lesson', 'english_title', [
        'single' => true,
        'type' => 'string',
        'show_in_rest' => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => '__return_true',
    ]);

    foreach (['lesson_audio', 'lesson_pdf'] as $meta_key) {
        register_post_meta('lesson', $meta_key, [
            'single' => true,
            'type' => 'string',
            'show_in_rest' => true,
            'sanitize_callback' => 'esc_url_raw',
            'auth_callback' => '__return_true',
        ]);
    }
});

add_action('add_meta_boxes_lesson', function () {
    add_meta_box(
        'for_kannada_english_title',
        __('English Title', 'for-kannada'),
        'for_kannada_render_english_title_box',
        'lesson',
        'normal',
        'high'
    );

    add_meta_box(
        'for_kannada_lesson_media',
        __('Lesson Media', 'for-kannada'),
        'for_kannada_render_lesson_media_box',
        'lesson',
        'normal',
        'default'
    );
});

function for_kannada_render_english_title_box($post) {
    wp_nonce_field('for_kannada_save_english_title', 'for_kannada_english_title_nonce');
    $value = get_post_meta($post->ID, 'english_title', true);
    ?>
    <p style="margin-top:0;">
        <label for="for_kannada_english_title_field"><?php esc_html_e('English title to show below the Kannada lesson title.', 'for-kannada'); ?></label>
    </p>
    <input
        type="text"
        id="for_kannada_english_title_field"
        name="for_kannada_english_title_field"
        value="<?php echo esc_attr($value); ?>"
        style="width:100%;max-width:640px;"
        placeholder="Example: The Butterfly"
    />
    <?php
}

function for_kannada_render_lesson_media_box($post) {
    wp_nonce_field('for_kannada_save_lesson_media', 'for_kannada_lesson_media_nonce');
    $audio = get_post_meta($post->ID, 'lesson_audio', true);
    $pdf = get_post_meta($post->ID, 'lesson_pdf', true);
    ?>
    <p>
        <label for="for_kannada_lesson_audio_field"><strong><?php esc_html_e('Audio Explanation', 'for-kannada'); ?></strong></label>
    </p>
    <p style="display:flex;gap:8px;max-width:760px;">
        <input
            type="url"
            id="for_kannada_lesson_audio_field"
            name="for_kannada_lesson_audio_field"
            value="<?php echo esc_attr($audio); ?>"
            style="flex:1;"
            placeholder="https://example.com/audio.mp3"
        />
        <button type="button" class="button for-kannada-media-upload" data-target="for_kannada_lesson_audio_field" data-library="audio">
            <?php esc_html_e('Select audio', 'for-kannada'); ?>
        </button>
    </p>

    <p>
        <label for="for_kannada_lesson_pdf_field"><strong><?php esc_html_e('Worksheet PDF', 'for-kannada'); ?></strong></label>
    </p>
    <p style="display:flex;gap:8px;max-width:760px;">
        <input
            type="url"
            id="for_kannada_lesson_pdf_field"
            name="for_kannada_lesson_pdf_field"
            value="<?php echo esc_attr($pdf); ?>"
            style="flex:1;"
            placeholder="https://example.com/worksheet.pdf"
        />
        <button type="button" class="button for-kannada-media-upload" data-target="for_kannada_lesson_pdf_field" data-library="application/pdf">
            <?php esc_html_e('Select PDF', 'for-kannada'); ?>
        </button>
    </p>
    <?php
}

add_action('admin_enqueue_scripts', function ($hook) {
    if (!in_array($hook, ['post.php', 'post-new.php'], true)) {
        return;
    }

    $screen = get_current_screen();
    if (!$screen || $screen->post_type !== 'lesson') {
        return;
    }

    wp_enqueue_media();
    wp_enqueue_script('jquery');
    wp_add_inline_script('jquery', "
        jQuery(function($) {
            $('.for-kannada-media-upload').on('click', function(event) {
                event.preventDefault();
                var button = $(this);
                var target = $('#' + button.data('target'));
                var libraryType = button.data('library');
                var frame = wp.media({
                    title: button.text(),
                    button: { text: 'Use this file' },
                    multiple: false,
                    library: { type: libraryType }
                });

                frame.on('select', function() {
                    var attachment = frame.state().get('selection').first().toJSON();
                    if (attachment && attachment.url) {
                        target.val(attachment.url);
                    }
                });

                frame.open();
            });
        });
    ");
});

add_action('save_post_lesson', function ($post_id) {
    if (!isset($_POST['for_kannada_english_title_nonce']) || !wp_verify_nonce($_POST['for_kannada_english_title_nonce'], 'for_kannada_save_english_title')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['for_kannada_english_title_field'])) {
        update_post_meta(
            $post_id,
            'english_title',
            sanitize_text_field(wp_unslash($_POST['for_kannada_english_title_field']))
        );
    }

    if (isset($_POST['for_kannada_lesson_media_nonce']) && wp_verify_nonce($_POST['for_kannada_lesson_media_nonce'], 'for_kannada_save_lesson_media')) {
        if (isset($_POST['for_kannada_lesson_audio_field'])) {
            update_post_meta(
                $post_id,
                'lesson_audio',
                esc_url_raw(wp_unslash($_POST['for_kannada_lesson_audio_field']))
            );
        }

        if (isset($_POST['for_kannada_lesson_pdf_field'])) {
            update_post_meta(
                $post_id,
                'lesson_pdf',
                esc_url_raw(wp_unslash($_POST['for_kannada_lesson_pdf_field']))
            );
        }
    }
});

add_filter('use_block_editor_for_post_type', function ($use_block_editor, $post_type) {
    if ($post_type === 'lesson') {
        return false;
    }

    return $use_block_editor;
}, 10, 2);
