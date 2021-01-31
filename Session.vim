let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/Nextproperty-website/server
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +75 src/app.ts
badd +1 src/database.ts
badd +10 src/routes/property.router.ts
badd +45 src/controllers/user.controller.ts
badd +38 src/models/user.ts
badd +1 src/config/config.ts
badd +8 src/routes/user.router.ts
argglobal
%argdel
edit src/config/config.ts
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 33 + 35) / 70)
exe 'vert 1resize ' . ((&columns * 109 + 110) / 220)
exe '2resize ' . ((&lines * 32 + 35) / 70)
exe 'vert 2resize ' . ((&columns * 109 + 110) / 220)
exe 'vert 3resize ' . ((&columns * 110 + 110) / 220)
argglobal
let s:l = 12 - ((11 * winheight(0) + 16) / 33)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
12
normal! 019|
wincmd w
argglobal
if bufexists("src/app.ts") | buffer src/app.ts | else | edit src/app.ts | endif
let s:l = 70 - ((15 * winheight(0) + 16) / 32)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
70
normal! 022|
wincmd w
argglobal
if bufexists("src/controllers/user.controller.ts") | buffer src/controllers/user.controller.ts | else | edit src/controllers/user.controller.ts | endif
let s:l = 40 - ((26 * winheight(0) + 33) / 66)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
40
normal! 0
wincmd w
2wincmd w
exe '1resize ' . ((&lines * 33 + 35) / 70)
exe 'vert 1resize ' . ((&columns * 109 + 110) / 220)
exe '2resize ' . ((&lines * 32 + 35) / 70)
exe 'vert 2resize ' . ((&columns * 109 + 110) / 220)
exe 'vert 3resize ' . ((&columns * 110 + 110) / 220)
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
