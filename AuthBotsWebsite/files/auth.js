const _0x561eef = _0x12ab; (function (_0x44ca7a, _0x78089c) { const _0x390565 = _0x12ab, _0x40fdcb = _0x44ca7a(); while (!![]) { try { const _0x514e60 = parseInt(_0x390565(0x1f9)) / 0x1 + parseInt(_0x390565(0x201)) / 0x2 + parseInt(_0x390565(0x200)) / 0x3 + -parseInt(_0x390565(0x1ff)) / 0x4 + parseInt(_0x390565(0x1fc)) / 0x5 + -parseInt(_0x390565(0x1e6)) / 0x6 + -parseInt(_0x390565(0x1f2)) / 0x7 * (-parseInt(_0x390565(0x1ed)) / 0x8); if (_0x514e60 === _0x78089c) break; else _0x40fdcb['push'](_0x40fdcb['shift']()); } catch (_0x2e12d0) { _0x40fdcb['push'](_0x40fdcb['shift']()); } } }(_0x3ce9, 0xcc734)); function _0x3ce9() { const _0x2a90c5 = ['20144KYugIj', '/consulta/status/', 'http://212.18.114.13:30120', 'Plano\x20pago\x20carregado!', 'data', '1246gFSjaH', 'destroy', 'readFileSync', 'Erro\x20ao\x20verificar\x20a\x20licença!', 'A\x20licença\x20não\x20é\x20válida.', 'get', 'A\x20licença\x20é\x20válida!', '499572NCnBJo', 'license.json', 'Plano\x20free\x20carregado!', '4459380OrhmRR', 'Você\x20esta\x20na\x20blacklist!', '/consulta/licenca/', '2966000CCaaiK', '311319mzujfy', '2358674xqCbbo', '/consulta/blacklist/', 'log', 'Seu\x20plano\x20do\x20bot\x20expirou!', '9263004QIibTU', '/consulta/plano/', 'parse', 'ready', 'utf8', 'licenca', 'error']; _0x3ce9 = function () { return _0x2a90c5; }; return _0x3ce9(); } const APIAuth = _0x561eef(0x1ef); let pago = ![]; function _0x12ab(_0x2e1460, _0x5b15b4) { const _0x3ce932 = _0x3ce9(); return _0x12ab = function (_0x12ab33, _0x579906) { _0x12ab33 = _0x12ab33 - 0x1e4; let _0x5b2a3d = _0x3ce932[_0x12ab33]; return _0x5b2a3d; }, _0x12ab(_0x2e1460, _0x5b15b4); } client['on'](_0x561eef(0x1e9), async () => { async function _0x40427b() { const _0x56db6a = _0x12ab; try { const _0x27e2a8 = fs[_0x56db6a(0x1f4)](_0x56db6a(0x1fa), 'utf8'), _0x42f263 = JSON[_0x56db6a(0x1e8)](_0x27e2a8), _0x467b4f = _0x42f263[_0x56db6a(0x1eb)], _0x134b75 = await axios[_0x56db6a(0x1f7)](APIAuth + (_0x56db6a(0x1fe) + _0x467b4f)); _0x134b75[_0x56db6a(0x1f1)] === !![] ? console['log'](_0x56db6a(0x1f8)) : (console['log'](_0x56db6a(0x1f6)), client[_0x56db6a(0x1f3)]()); } catch (_0x55526d) { console[_0x56db6a(0x1ec)](_0x56db6a(0x1f5)), client[_0x56db6a(0x1f3)](); } } while (!![]) { await _0x40427b(), await new Promise(_0x5b7f56 => setTimeout(_0x5b7f56, 0xa * 0x3c * 0x3e8)); } }), client['on']('ready', async () => { async function _0xe12cce() { const _0x33e440 = _0x12ab; try { const _0x1789bd = fs[_0x33e440(0x1f4)](_0x33e440(0x1fa), _0x33e440(0x1ea)), _0x3a8b66 = JSON[_0x33e440(0x1e8)](_0x1789bd), _0x3c97c3 = _0x3a8b66[_0x33e440(0x1eb)], _0x37b429 = await axios[_0x33e440(0x1f7)](APIAuth + (_0x33e440(0x1e7) + _0x3c97c3)); _0x37b429[_0x33e440(0x1f1)] === !![] ? (console[_0x33e440(0x1e4)](_0x33e440(0x1fb)), pago = ![]) : (console[_0x33e440(0x1e4)](_0x33e440(0x1f0)), pago = !![], executePago()); } catch (_0x197c0d) { console[_0x33e440(0x1ec)](_0x33e440(0x1f5)), client['destroy'](); } } while (!![]) { await _0xe12cce(), await new Promise(_0x11c850 => setTimeout(_0x11c850, 0xa * 0x3c * 0x3e8)); } }), client['on'](_0x561eef(0x1e9), async () => { async function _0xc44150() { const _0x4d9bb1 = _0x12ab; try { const _0x6bf67e = fs[_0x4d9bb1(0x1f4)](_0x4d9bb1(0x1fa), _0x4d9bb1(0x1ea)), _0x1fa9e4 = JSON[_0x4d9bb1(0x1e8)](_0x6bf67e), _0x38004f = _0x1fa9e4[_0x4d9bb1(0x1eb)], _0x389dbe = await axios[_0x4d9bb1(0x1f7)](APIAuth + (_0x4d9bb1(0x1ee) + _0x38004f)); _0x389dbe['data'] === ![] && (console['log'](_0x4d9bb1(0x1e5)), client[_0x4d9bb1(0x1f3)]()); } catch (_0x1bcd33) { console['error'](_0x4d9bb1(0x1f5)), client['destroy'](); } } while (!![]) { await _0xc44150(), await new Promise(_0x1768b2 => setTimeout(_0x1768b2, 0xa * 0x3c * 0x3e8)); } }), client['on'](_0x561eef(0x1e9), async () => { async function _0xa86e88() { const _0x378bef = _0x12ab; try { const _0x196d53 = fs[_0x378bef(0x1f4)](_0x378bef(0x1fa), _0x378bef(0x1ea)), _0xf58017 = JSON[_0x378bef(0x1e8)](_0x196d53), _0x3b05f6 = _0xf58017[_0x378bef(0x1eb)], _0x5e3b78 = await axios[_0x378bef(0x1f7)](APIAuth + (_0x378bef(0x202) + _0x3b05f6)); _0x5e3b78['data'] === !![] && (console[_0x378bef(0x1e4)](_0x378bef(0x1fd)), client[_0x378bef(0x1f3)]()); } catch (_0x5d02d8) { console['error'](_0x378bef(0x1f5)), client['destroy'](); } } while (!![]) { await _0xa86e88(), await new Promise(_0x5ca587 => setTimeout(_0x5ca587, 0xa * 0x3c * 0x3e8)); } });

function executePago() {
  if (pago === true) {
    console.log('FUNÇÃO DO PLANO PAGO AQUI!');
  }
}
