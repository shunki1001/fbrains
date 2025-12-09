<?php
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
  wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
  wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style')
);
}

function display_multiple_react_tools($atts) {
    $atts = shortcode_atts(
        array(
            'name' => 'toolA', // デフォルトのツール名
        ),
        $atts,
        'my_react_tool'
    );

    $tool_name = sanitize_file_name($atts['name']); // セキュリティのためファイル名として使える文字にサニタイズ

    // ツール名に基づいてファイルパスを動的に生成
    $base_path = get_stylesheet_directory() . '/react-apps/' . $tool_name;
    $base_url = get_stylesheet_directory_uri() . '/react-apps/' . $tool_name;
    
    // CSSとJSのファイルを探す
    $css_file = glob($base_path . '/assets/*.css');
    $js_file = glob($base_path . '/assets/*.js');

    if ($css_file) {
        $css_url = $base_url . '/assets/' . basename($css_file[0]);
        // ハンドル名（第1引数）もユニークにする
        wp_enqueue_style('react-tool-style-' . $tool_name, $css_url);
    }

    if ($js_file) {
        $js_url = $base_url . '/assets/' . basename($js_file[0]);
        // ハンドル名（第1引数）もユニークにする
        wp_enqueue_script('react-tool-script-' . $tool_name, $js_url, array(), null, true);
    }

    // React側で指定したユニークなIDを持つHTML要素を返す
    // 例: <div id="react-app-toolA"></div>
    return '<div id="root"></div>';
}

add_shortcode('my_react_tool', 'display_multiple_react_tools');

?>