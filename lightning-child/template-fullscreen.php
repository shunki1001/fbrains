<?php
/**
 * Template Name: フルスクリーン表示用テンプレート
 * Template Post Type: page
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); // ← これは必須！CSSやJSの読み込みに必要です ?>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <main>
        <?php
        // WordPressのループ：ページの内容（ショートコードなど）を表示します
        while ( have_posts() ) :
            the_post();
            the_content();
        endwhile;
        ?>
    </main>

    <?php wp_footer(); // ← これも必須！ReactのJSファイル読み込みなどに必要です ?>
</body>
</html>