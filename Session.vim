let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/Nextproperty_website
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +26 src/app.ts
badd +97 src/router.ts
badd +6 src/models/property.ts
badd +32 src/views/props/list.hbs
badd +4 src/views/partials/navigation.hbs
badd +8 src/views/layouts/main.hbs
badd +1 package.json
argglobal
%argdel
edit src/router.ts
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 122 + 62) / 124)
exe 'vert 2resize ' . ((&columns * 1 + 62) / 124)
argglobal
let s:l = 1 - ((0 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
wincmd w
argglobal
if bufexists("src/views/partials/navigation.hbs") | buffer src/views/partials/navigation.hbs | else | edit src/views/partials/navigation.hbs | endif
let s:l = 4 - ((0 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
4
normal! 05|
wincmd w
exe 'vert 1resize ' . ((&columns * 122 + 62) / 124)
exe 'vert 2resize ' . ((&columns * 1 + 62) / 124)
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
