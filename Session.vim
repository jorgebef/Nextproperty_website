let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/Nextproperty-website/server
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +62 src/app.ts
badd +1 src/database.ts
badd +1 src/routes/property.router.ts
badd +25 src/middlewares/auth.middleware.ts
badd +63 src/controllers/user.controller.ts
badd +38 src/models/user.ts
badd +1 package.json
argglobal
%argdel
edit src/controllers/user.controller.ts
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
let s:l = 63 - ((40 * winheight(0) + 33) / 66)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
63
normal! 05|
wincmd w
argglobal
if bufexists("package.json") | buffer package.json | else | edit package.json | endif
let s:l = 1 - ((0 * winheight(0) + 33) / 66)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/Documents/Github/Nextproperty-website/server
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
