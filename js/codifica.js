/*
		http://www.netlobo.com/url_query_string_javascript.html
  
		http://www.foo.com/index.html?bob=123&frank=321&tom=213#top
		var frank_param = gup( 'frank' );
		Now if you look at the frank_param variable it contains the number 321.
*/

// Get the radio selected value
function getRadioValue(group) {
  for (var i=0, iLen=group.length; i<iLen; i++) {
    if (group[i].checked) {
      return group[i].value;
    }
  }
  // No button selected - return '' or undefined?
  return '';
}

var B64 = {
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    lookup: null,
    ie: /MSIE /.test(navigator.userAgent),
    ieo: /MSIE [67]/.test(navigator.userAgent),
    encode: function (s) {
        var buffer = B64.toUtf8(s),
		//var buffer = s,
            position = -1,
            len = buffer.length,
            nan0, nan1, nan2, enc = [, , , ];
        if (B64.ie) {
            var result = [];
            while (++position < len) {
                nan0 = buffer[position];
                nan1 = buffer[++position];
                enc[0] = nan0 >> 2;
                enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
                if (isNaN(nan1))
                    enc[2] = enc[3] = 64;
                else {
                    nan2 = buffer[++position];
                    enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                    enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
                }
                result.push(B64.alphabet.charAt(enc[0]), B64.alphabet.charAt(enc[1]), B64.alphabet.charAt(enc[2]), B64.alphabet.charAt(enc[3]));
            }
            return result.join('');
        } else {
            var result = '';
            while (++position < len) {
                nan0 = buffer[position];
                nan1 = buffer[++position];
                enc[0] = nan0 >> 2;
                enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
                if (isNaN(nan1))
                    enc[2] = enc[3] = 64;
                else {
                    nan2 = buffer[++position];
                    enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                    enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
                }
                result += B64.alphabet[enc[0]] + B64.alphabet[enc[1]] + B64.alphabet[enc[2]] + B64.alphabet[enc[3]];
            }
            return result;
        }
    },
    decode: function (s) {
        if (s.length % 4)
            throw new Error("InvalidCharacterError: 'B64.decode' failed: The string to be decoded is not correctly encoded.");
        var buffer = B64.fromUtf8(s),
		//var buffer = s,
            position = 0,
            len = buffer.length;
        if (B64.ieo) {
            var result = [];
            while (position < len) {
                if (buffer[position] < 128) 
                    result.push(String.fromCharCode(buffer[position++]));
                else if (buffer[position] > 191 && buffer[position] < 224) 
                    result.push(String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63)));
                else 
                    result.push(String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63)));
            }
            return result.join('');
        } else {
            var result = '';
            while (position < len) {
                if (buffer[position] < 128) 
                    result += String.fromCharCode(buffer[position++]);
                else if (buffer[position] > 191 && buffer[position] < 224) 
                    result += String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63));
                else 
                    result += String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63));
            }
            return result;
        }
    },
    toUtf8: function (s) {
        var position = -1,
            len = s.length,
            chr, buffer = [];
        if (/^[\x00-\x7f]*$/.test(s)) while (++position < len)
            buffer.push(s.charCodeAt(position));
        else while (++position < len) {
            chr = s.charCodeAt(position);
            if (chr < 128) 
                buffer.push(chr);
            else if (chr < 2048) 
                buffer.push((chr >> 6) | 192, (chr & 63) | 128);
            else 
                buffer.push((chr >> 12) | 224, ((chr >> 6) & 63) | 128, (chr & 63) | 128);
        }
        return buffer;
    },
    fromUtf8: function (s) {
        var position = -1,
            len, buffer = [],
            enc = [, , , ];
        if (!B64.lookup) {
            len = B64.alphabet.length;
            B64.lookup = {};
            while (++position < len)
                B64.lookup[B64.alphabet.charAt(position)] = position;
            position = -1;
        }
        len = s.length;
        while (++position < len) {
            enc[0] = B64.lookup[s.charAt(position)];
            enc[1] = B64.lookup[s.charAt(++position)];
            buffer.push((enc[0] << 2) | (enc[1] >> 4));
            enc[2] = B64.lookup[s.charAt(++position)];
            if (enc[2] == 64) 
                break;
            buffer.push(((enc[1] & 15) << 4) | (enc[2] >> 2));
            enc[3] = B64.lookup[s.charAt(++position)];
            if (enc[3] == 64) 
                break;
            buffer.push(((enc[2] & 3) << 6) | enc[3]);
        }
        return buffer;
    }
};


function codifica(){
	var formulario = document.getElementById("formulario");
	var senha = $('#senha').val();
	var texto = $('#texto_codificar').val();
	var x = document.getElementById("mySelect1").selectedIndex;
	
	var direcao = getRadioValue(document.forms['formulario']['direcao']);
	
	//var base64 = formulario.base64.checked;
	var base64 = document.getElementsByTagName("option")[x].value;
	//alert(base64);

	var cifrado = "";
	var local = 0;
	var tmp1 = 0;
	var tmp2 = 0;
	var t = "";
	var tamanho = senha.length;

	if (direcao == -1 && base64=="base64"){
		texto = B64.decode(texto);
	}
	if (direcao == -1 && base64=="hexadecimal"){
		texto = Hex.decode(texto);
	}
	if (direcao == -1 && base64=="binario"){
		texto = Bin.decode(texto);
	}
	
	for (var k = 0; k <= texto.length - 1; k++) {
		local = k - Math.floor(k / tamanho) * tamanho;
		tmp1 = texto.charCodeAt(k);
		tmp2 = senha.charCodeAt(local) - 48;
		t = String.fromCharCode(tmp1 + (direcao * tmp2));
		cifrado = cifrado + t;
	}
	if (direcao == 1 && base64=="base64"){
		cifrado = B64.encode(cifrado);
	}
	if (direcao == 1 && base64=="hexadecimal"){
		cifrado = Hex.encode(cifrado);
	}
	if (direcao == 1 && base64=="binario"){
		cifrado = Bin.encode(cifrado);
	}
	$('#texto_decodificar').val(cifrado);
	//$('#texto_saida').text(cifrado);
}
function limpa(){
	var formulario = document.getElementById("formulario");
	formulario.texto_codificar.value = "";
	formulario.texto_decodificar.value = "";
	formulario.senha.value = "0";
}

 var Hex = {
    encode: function(str){
		var result = '';
		for (var i=0; i<str.length; i++) {
			result += "0x" + Casas(str.charCodeAt(i).toString(16),2) + " ";
		}
		return result;
	} , 
	decode: function(str1){
		var str1 = str1.toString();//force conversion
		var str2 = '';
		for (var i = 0; i < str1.length; i += 5){
			str2 += String.fromCharCode(parseInt(str1.substr(i+2, 2), 16));
		}
		return str2;
	}
 }
 function Casas(a,b){
  var saida = "00000000".concat(a);
  return Right(saida,b);
}
function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}
function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}
var Bin = {
    encode: function(str){
		var result = '';
		for (var i=0; i<str.length; i++) {
			result += Casas(str.charCodeAt(i).toString(2),8) + " ";
		}
		//result = result.concat(" ");
		return result;
	} , 
	decode: function(str1){
		var str1 = str1.toString();//force conversion
		var str2 = '';
		for (var i = 0; i < str1.length; i += 9){
			str2 += String.fromCharCode(parseInt(str1.substr(i, 8), 2));
		}
		return str2;
	}
 }
