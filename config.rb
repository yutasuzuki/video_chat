# ************************************
#  Environment Switch
# ************************************
# 開発モードか製品モードか指定（default :development）
# Gruntfile.js or Gruntfile.coffee に設定を書いている場合は不要
# environment = :production
 
 
# ************************************
#  HTTP Path
# ************************************
# http://から始まるパスを指定すると
# image-url で取得するパスなどが http_path から始まる URL になる
http_path = "/"
 
 
# ************************************
#  Project Path
# ************************************
# Project用のディレクトリを指定
#project_path = "/"
 
 
# ************************************
#  Sass Directory
# ************************************
# project_path からの相対で指定
sass_dir = "sass"
 
 
# ************************************
#  CSS Directory
# ************************************
# project_path からの相対で指定（コンパイル後）
css_dir = (environment == :production) ? "css" : "css"
 
 
# ************************************
#  Image Directory
# ************************************
# project_path からの相対で指定（コンパイル後）
# image-whidth でサイズを取得したりスプライトを作ったりなど
images_dir = "shared/imgs"
 
 
# ************************************
#  Font Directory
# ************************************
# project_path からの相対で指定（コンパイル後）
fonts_dir = "shared/font"
 
 
# ************************************
#  JavaScript Directory
# ************************************
# project_path からの相対で指定（コンパイル後）
javascripts_dir = "shared/scripts"
 
 
# ************************************
#  Output Style Setting
# ************************************
# environment = :production の場合に :compressed で出力
# environment = :development の場合に :expanded で出力
output_style = ( environment == :production ) ? :compressed : :expanded
 
 
# ************************************
#  Debug Setting
# ************************************
# environment = :production の場合に行番号を出力しない
# environment = :development の場合に行番号を出力する
line_comments = ( environment == :production ) ? false : true
 
 
# ************************************
#  Other
# ************************************
# 出力 CSS の画像 URL にクエリを付けない
asset_cache_buster :none
 
 
# ************************************
#  Sprites
# ************************************
# Make a copy of sprites with a name that has no uniqueness of the hash.
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end
 
# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end

