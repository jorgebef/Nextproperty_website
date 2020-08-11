let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/nextproperty_backend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +39 src/app.ts
badd +17 src/routes/property.router.ts
badd +20 src/middlewares/navbar.middleware.ts
badd +11 src/middlewares/auth.middleware.ts
badd +38 src/controllers/user.controller.ts
badd +8 src/routes/user.router.ts
badd +0 src/views/control_panel/create.hbs
badd +21 src/controllers/property.controller.ts
argglobal
%argdel
edit src/routes/property.router.ts
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
exe 'vert 1resize ' . ((&columns * 124 + 124) / 249)
exe 'vert 2resize ' . ((&columns * 124 + 124) / 249)
argglobal
let s:l = 12 - ((11 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
12
normal! 038|
wincmd w
argglobal
if bufexists("src/views/control_panel/create.hbs") | buffer src/views/control_panel/create.hbs | else | edit src/views/control_panel/create.hbs | endif
if &buftype ==# 'terminal'
  silent file src/views/control_panel/create.hbs
endif
let s:l = 10 - ((9 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
10
normal! 0
wincmd w
exe 'vert 1resize ' . ((&columns * 124 + 124) / 249)
exe 'vert 2resize ' . ((&columns * 124 + 124) / 249)
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
