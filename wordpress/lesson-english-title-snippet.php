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
});

add_filter('use_block_editor_for_post_type', function ($use_block_editor, $post_type) {
    if ($post_type === 'lesson') {
        return false;
    }

    return $use_block_editor;
}, 10, 2);
