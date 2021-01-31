let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/Nextproperty-website/server
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +64 src/app.ts
badd +1 src/database.ts
badd +6 src/routes/property.router.ts
badd +45 src/controllers/user.controller.ts
badd +38 src/models/user.ts
badd +8 src/routes/user.router.ts
argglobal
%argdel
edit src/app.ts
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
exe 'vert 1resize ' . ((&columns * 109 + 110) / 220)
exe 'vert 2resize ' . ((&columns * 110 + 110) / 220)
argglobal
let s:l = 64 - ((34 * winheight(0) + 33) / 66)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
64
normal! 09|
wincmd w
argglobal
if bufexists("src/controllers/user.controller.ts") | buffer src/controllers/user.controller.ts | else | edit src/controllers/user.controller.ts | endif
let s:l = 38 - ((19 * winheight(0) + 33) / 66)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
38
normal! 015|
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 109 + 110) / 220)
exe 'vert 2resize ' . ((&columns * 110 + 110) / 220)
if exists(':tcd') == 2 | tcd ~/Documents/Github/Nextproperty-website/server | endif
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFAc
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
