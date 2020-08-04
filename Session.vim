let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/Nextproperty_website
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +3 src/api/controllers/user.controller.ts
badd +1 src/api/controllers/property.controller.ts
badd +5 src/api/routes/property.router.ts
badd +12 src/api/models/user.ts
badd +20 src/views/partials/navigation.hbs
badd +54 src/app.ts
badd +4 src/api/controllers/auth.controller.ts
badd +24 src/api/config/config.ts
badd +1 .env
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
exe 'vert 1resize ' . ((&columns * 124 + 124) / 249)
exe 'vert 2resize ' . ((&columns * 124 + 124) / 249)
argglobal
let s:l = 46 - ((33 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
46
normal! 013|
lcd ~/Documents/Github/Nextproperty_website
wincmd w
argglobal
if bufexists("~/Documents/Github/Nextproperty_website/src/api/config/config.ts") | buffer ~/Documents/Github/Nextproperty_website/src/api/config/config.ts | else | edit ~/Documents/Github/Nextproperty_website/src/api/config/config.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/Github/Nextproperty_website/src/api/config/config.ts
endif
let s:l = 18 - ((17 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
18
normal! 05|
lcd ~/Documents/Github/Nextproperty_website
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
