/**
* Copyright dalmate@outlook.com
* All right reversed
* 2014
*/
function Emoticon(){
};
	
Emoticon.prototype.constructor = Emoticon;
Emoticon.prototype.parent;
Emoticon.prototype.friendNick;
//ymoticon
Emoticon.regexp =/(>:D<|#:-S|O:-\)|<:-P|:-SS|<\):\)|:-\?\?|3:-O|:\(\|\)|@};-|\*\*==|\(~~\)|\*-:\)|\[-O<|:\)>-|\\:D\x2f|\^:\)\^|;;\)|:-\x2f|:\x22>|:-\*|=\(\(|:-O|B-\)|:-S|>:\)|:\(\(|:\)\)|\x2f:\)|=\)\)|:-B|:-c|:\)\]|~X\(|:-h|:-t|8->|I-\)|8-\||L-\)|:-&|:-\$|\[-\(|:O\)|8-}|\(:\||=P~|:-\?|#-o|=D>|@-\)|:\^o|:-w|:-<|>:P|:o3|%-\(|:@\)|~:>|%%-|~O\)|8-X|=:\)|>-\)|:-L|\$-\)|:-\x22|b-\(|\[-X|>:\x2f|;\)\)|:-@|:-j|\(\*\)|o->|o=>|o-\+|\(%\)|:\)|:\(|;\)|X\(|:>|:\||=;)/ig;
Emoticon.regexp_case_sensitive = /(:D|:X|:P)/g;

Emoticon.reverseHash = [
	":)",
	":(",
	";)",
	":d",
	";;)",
	">:d<",
	":-/",
	":x",
	":\">",
	":p",
	":-*",
	"=((",
	":-o",
	"x(",
	":>",
	"b-)",
	":-s",
	"#:-s",
	">:)",
	":((",
	":))",
	":|",
	"/:)",
	"=))",
	"o:-)",
	":-b",
	"=;",
	"i-)",
	"8-|",
	"l-)",
	":-&",
	":-$",
	"[-(",
	":o)",
	"8-}",
	"<:-p",
	"(:|",
	"=p~",
	":-?",
	"#-o",
	"=d>",
	":-ss",
	"@-)",
	":^o",
	":-w",
	":-<",
	">:p",
	"<):)",
	":@)",
	"3:-o",
	":(|)",
	"~:>",
	"@};-",
	"%%-",
	"**==",
	"(~~)",
	"~o)",
	"*-:)",
	"8-x",
	"=:)",
	">-)",
	":-l",
	"[-o<",
	"$-)",
	":-\"",
	"b-(",
	":)>-",
	"[-x",
	"\\:d/",
	">:/",
	";))",
	"o->",
	"o=>",
	"o-+",
	"(%)",
	":-@",
	"^:)^",
	":-j",
	"(*)",
	":)]",
	":-c",
	"~x(",
	":-h",
	":-t",
	"8->",
	":-??",
	"%-(",
	":o3"
];

Emoticon.hash = {
	":)" : {
	    "width" : 18,
	    "alt" : "happy",
	    "src" : "Share/css/1.gif",
	    "text" : ":)",
	    "regexp" : ":\\)",
	    "height" : 18
	  },
	  ":(" : {
	    "width" : 18,
	    "alt" : "sad",
	    "src" : "Share/css/2.gif",
	    "text" : ":(",
	    "regexp" : ":\\(",
	    "height" : 18
	  },
	  "(~~)" : {
	    "width" : 17,
	    "alt" : "pumpkin",
	    "src" : "Share/css/56.gif",
	    "text" : "(~~)",
	    "regexp" : "\\(~~\\)",
	    "height" : 18
	  },
	  "~o)" : {
	    "width" : 18,
	    "alt" : "coffee",
	    "src" : "Share/css/57.gif",
	    "text" : "~O)",
	    "regexp" : "~O\\)",
	    "height" : 18
	  },
	  ":\">" : {
	    "width" : 18,
	    "alt" : "blushing",
	    "src" : "css/9.gif",
	    "text" : ":\">",
	    "regexp" : ":\\x22>",
	    "height" : 18
	  },
	  "[-(" : {
	    "width" : 18,
	    "alt" : "not talking",
	    "src" : "Share/css/33.gif",
	    "text" : "[-(",
	    "regexp" : "\\[-\\(",
	    "height" : 18
	  },
	  ">:d<" : {
	    "width" : 42,
	    "alt" : "big hug",
	    "src" : "Share/css/6.gif",
	    "text" : ">:D<",
	    "regexp" : ">:D<",
	    "height" : 18
	  },
	  "#-o" : {
	    "width" : 24,
	    "alt" : "d'oh",
	    "src" : "Share/css/40.gif",
	    "text" : "#-o",
	    "regexp" : "#-o",
	    "height" : 18
	  },
	  "[-x" : {
	    "width" : 22,
	    "alt" : "shame on you",
	    "src" : "Share/css/68.gif",
	    "text" : "[-X",
	    "regexp" : "\\[-X",
	    "height" : 18
	  },
	  ":-t" : {
	    "width" : 30,
	    "alt" : "time out",
	    "src" : "Share/css/84.gif",
	    "text" : ":-t",
	    "regexp" : ":-t",
	    "height" : 18
	  },
	  ":(|)" : {
	    "width" : 21,
	    "alt" : "monkey",
	    "src" : "Share/css/51.gif",
	    "text" : ":(|)",
	    "regexp" : ":\\(\\|\\)",
	    "height" : 18
	  },
	  ":o)" : {
	    "width" : 28,
	    "alt" : "clown",
	    "src" : "Share/css/34.gif",
	    "text" : ":O)",
	    "regexp" : ":O\\)",
	    "height" : 18
	  },
	  "i-)" : {
	    "width" : 21,
	    "alt" : "sleepy",
	    "src" : "Share/css/28.gif",
	    "text" : "I-)",
	    "regexp" : "I-\\)",
	    "height" : 18
	  },
	  ";;)" : {
	    "width" : 18,
	    "alt" : "batting eyelashes",
	    "src" : "Share/css/5.gif",
	    "text" : ";;)",
	    "regexp" : ";;\\)",
	    "height" : 18
	  },
	  ":^o" : {
	    "width" : 18,
	    "alt" : "liar",
	    "src" : "Share/css/44.gif",
	    "text" : ":^o",
	    "regexp" : ":\\^o",
	    "height" : 18
	  },
	  "<:-p" : {
	    "width" : 38,
	    "alt" : "party",
	    "src" : "Share/css/36.gif",
	    "text" : "<:-P",
	    "regexp" : "<:-P",
	    "height" : 18
	  },
	  "x(" : {
	    "width" : 34,
	    "alt" : "angry",
	    "src" : "Share/css/14.gif",
	    "text" : "X(",
	    "regexp" : "X\\(",
	    "height" : 18
	  },
	  ":-/" : {
	    "width" : 20,
	    "alt" : "confused",
	    "src" : "Share/css/7.gif",
	    "text" : ":-/",
	    "regexp" : ":-\\x2f",
	    "height" : 18
	  },
	  "#:-s" : {
	    "width" : 34,
	    "alt" : "whew!",
	    "src" : "Share/css/18.gif",
	    "text" : "#:-S",
	    "regexp" : "#:-S",
	    "height" : 18
	  },
	  "8->" : {
	    "width" : 23,
	    "alt" : "daydreaming",
	    "src" : "Share/css/85.gif",
	    "text" : "8->",
	    "regexp" : "8->",
	    "height" : 18
	  },
	  ":d" : {
	    "width" : 18,
	    "alt" : "big grin",
	    "src" : "Share/css/4.gif",
	    "text" : ":D",
	    "regexp" : ":D",
	    "height" : 18
	  },
	  "\\:d/" : {
	    "width" : 26,
	    "alt" : "dancing",
	    "src" : "Share/css/69.gif",
	    "text" : "\\:D/",
	    "regexp" : "\\\\:D\\x2f",
	    "height" : 18
	  },
	  ":-b" : {
	    "width" : 24,
	    "alt" : "nerd",
	    "src" : "Share/css/26.gif",
	    "text" : ":-B",
	    "regexp" : ":-B",
	    "height" : 18
	  },
	  ":-@" : {
	    "width" : 36,
	    "alt" : "chatterbox",
	    "src" : "Share/css/76.gif",
	    "text" : ":-@",
	    "regexp" : ":-@",
	    "height" : 18
	  },
	  ":-h" : {
	    "width" : 28,
	    "alt" : "wave",
	    "src" : "Share/css/83.gif",
	    "text" : ":-h",
	    "regexp" : ":-h",
	    "height" : 18
	  },
	  ":-c" : {
	    "width" : 28,
	    "alt" : "call me",
	    "src" : "Share/css/81.gif",
	    "text" : ":-c",
	    "regexp" : ":-c",
	    "height" : 18
	  },
	  "=p~" : {
	    "width" : 18,
	    "alt" : "drooling",
	    "src" : "Share/css/38.gif",
	    "text" : "=P~",
	    "regexp" : "=P~",
	    "height" : 18
	  },
	  "(:|" : {
	    "width" : 18,
	    "alt" : "yawn",
	    "src" : "Share/css/37.gif",
	    "text" : "(:|",
	    "regexp" : "\\(:\\|",
	    "height" : 18
	  },
	  ":-o" : {
	    "width" : 18,
	    "alt" : "surprise",
	    "src" : "Share/css/13.gif",
	    "text" : ":-O",
	    "regexp" : ":-O",
	    "height" : 18
	  },
	  "o->" : {
	    "width" : 18,
	    "alt" : "hiro",
	    "src" : "Share/css/72.gif",
	    "text" : "o->",
	    "regexp" : "o->",
	    "height" : 18
	  },
	  ":))" : {
	    "width" : 18,
	    "alt" : "laughing",
	    "src" : "Share/css/21.gif",
	    "text" : ":))",
	    "regexp" : ":\\)\\)",
	    "height" : 18
	  },
	  "/:)" : {
	    "width" : 18,
	    "alt" : "raised eyebrow",
	    "src" : "Share/css/23.gif",
	    "text" : "/:)",
	    "regexp" : "\\x2f:\\)",
	    "height" : 18
	  },
	  "*-:)" : {
	    "width" : 30,
	    "alt" : "idea",
	    "src" : "Share/css/58.gif",
	    "text" : "*-:)",
	    "regexp" : "\\*-:\\)",
	    "height" : 18
	  },
	  ":)]" : {
	    "width" : 31,
	    "alt" : "on the phone",
	    "src" : "Share/css/80.gif",
	    "text" : ":)]",
	    "regexp" : ":\\)\\]",
	    "height" : 18
	  },
	  ":-ss" : {
	    "width" : 36,
	    "alt" : "nailbiting",
	    "src" : "Share/css/42.gif",
	    "text" : ":-SS",
	    "regexp" : ":-SS",
	    "height" : 18
	  },
	  "(%)" : {
	    "width" : 18,
	    "alt" : "yin yang",
	    "src" : "Share/css/75.gif",
	    "text" : "(%)",
	    "regexp" : "\\(%\\)",
	    "height" : 18
	  },
	  ":-*" : {
	    "width" : 18,
	    "alt" : "kiss",
	    "src" : "Share/css/11.gif",
	    "text" : ":-*",
	    "regexp" : ":-\\*",
	    "height" : 18
	  },
	  "~x(" : {
	    "width" : 44,
	    "alt" : "at wits' end",
	    "src" : "Share/css/82.gif",
	    "text" : "~X(",
	    "regexp" : "~X\\(",
	    "height" : 18
	  },
	  "o=>" : {
	    "width" : 18,
	    "alt" : "billy",
	    "src" : "Share/css/73.gif",
	    "text" : "o=>",
	    "regexp" : "o=>",
	    "height" : 18
	  },
	  ":-??" : {
	    "width" : 40,
	    "alt" : "I don't know",
	    "src" : "Share/css/86.gif",
	    "text" : ":-??",
	    "regexp" : ":-\\?\\?",
	    "height" : 18
	  },
	  "@-)" : {
	    "width" : 18,
	    "alt" : "hypnotized",
	    "src" : "Share/css/43.gif",
	    "text" : "@-)",
	    "regexp" : "@-\\)",
	    "height" : 18
	  },
	  "3:-o" : {
	    "width" : 18,
	    "alt" : "cow",
	    "src" : "Share/css/50.gif",
	    "text" : "3:-O",
	    "regexp" : "3:-O",
	    "height" : 18
	  },
	  "=d>" : {
	    "width" : 18,
	    "alt" : "applause",
	    "src" : "Share/css/41.gif",
	    "text" : "=D>",
	    "regexp" : "=D>",
	    "height" : 18
	  },
	  ":-w" : {
	    "width" : 23,
	    "alt" : "waiting",
	    "src" : "Share/css/45.gif",
	    "text" : ":-w",
	    "regexp" : ":-w",
	    "height" : 18
	  },
	  ":x" : {
	    "width" : 18,
	    "alt" : "love struck",
	    "src" : "Share/css/8.gif",
	    "text" : ":x",
	    "regexp" : ":x",
	    "height" : 18
	  },
	  ":-$" : {
	    "width" : 18,
	    "alt" : "don't tell anyone",
	    "src" : "Share/css/32.gif",
	    "text" : ":-$",
	    "regexp" : ":-\\$",
	    "height" : 18
	  },
	  "~:>" : {
	    "width" : 18,
	    "alt" : "chicken",
	    "src" : "Share/css/52.gif",
	    "text" : "~:>",
	    "regexp" : "~:>",
	    "height" : 18
	  },
	  "=:)" : {
	    "width" : 20,
	    "alt" : "bug",
	    "src" : "Share/css/60.gif",
	    "text" : "=:)",
	    "regexp" : "=:\\)",
	    "height" : 18
	  },
	  "(*)" : {
	    "width" : 18,
	    "alt" : "star",
	    "src" : "Share/css/79.gif",
	    "text" : "(*)",
	    "regexp" : "\\(\\*\\)",
	    "height" : 18
	  },
	  ":|" : {
	    "width" : 18,
	    "alt" : "straight face",
	    "src" : "Share/css/22.gif",
	    "text" : ":|",
	    "regexp" : ":\\|",
	    "height" : 18
	  },
	  ":((" : {
	    "width" : 22,
	    "alt" : "crying",
	    "src" : "Share/css/20.gif",
	    "text" : ":((",
	    "regexp" : ":\\(\\(",
	    "height" : 18
	  },
	  "8-x" : {
	    "width" : 18,
	    "alt" : "skull",
	    "src" : "Share/css/59.gif",
	    "text" : "8-X",
	    "regexp" : "8-X",
	    "height" : 18
	  },
	  "o:-)" : {
	    "width" : 30,
	    "alt" : "angel",
	    "src" : "Share/css/25.gif",
	    "text" : "O:-)",
	    "regexp" : "O:-\\)",
	    "height" : 18
	  },
	  ">:p" : {
	    "width" : 18,
	    "alt" : "phbbbbt",
	    "src" : "Share/css/47.gif",
	    "text" : ">:P",
	    "regexp" : ">:P",
	    "height" : 18
	  },
	  ">-)" : {
	    "width" : 18,
	    "alt" : "alien",
	    "src" : "Share/css/61.gif",
	    "text" : ">-)",
	    "regexp" : ">-\\)",
	    "height" : 18
	  },
	  "=((" : {
	    "width" : 18,
	    "alt" : "broken heart",
	    "src" : "Share/css/12.gif",
	    "text" : "=((",
	    "regexp" : "=\\(\\(",
	    "height" : 18
	  },
	  "l-)" : {
	    "width" : 24,
	    "alt" : "loser",
	    "src" : "Share/css/30.gif",
	    "text" : "L-)",
	    "regexp" : "L-\\)",
	    "height" : 18
	  },
	  ":@)" : {
	    "width" : 18,
	    "alt" : "pig",
	    "src" : "Share/css/49.gif",
	    "text" : ":@)",
	    "regexp" : ":@\\)",
	    "height" : 18
	  },
	  ">:/" : {
	    "width" : 23,
	    "alt" : "bring it on",
	    "src" : "Share/css/70.gif",
	    "text" : ">:/",
	    "regexp" : ">:\\x2f",
	    "height" : 18
	  },
	  "b-(" : {
	    "width" : 18,
	    "alt" : "feeling beat up",
	    "src" : "Share/css/66.gif",
	    "text" : "b-(",
	    "regexp" : "b-\\(",
	    "height" : 18
	  },
	  "$-)" : {
	    "width" : 18,
	    "alt" : "money eyes",
	    "src" : "Share/css/64.gif",
	    "text" : "$-)",
	    "regexp" : "\\$-\\)",
	    "height" : 18
	  },
	  ":-?" : {
	    "width" : 18,
	    "alt" : "thinking",
	    "src" : "Share/css/39.gif",
	    "text" : ":-?",
	    "regexp" : ":-\\?",
	    "height" : 18
	  },
	  ":)>-" : {
	    "width" : 22,
	    "alt" : "peace sign",
	    "src" : "Share/css/67.gif",
	    "text" : ":)>-",
	    "regexp" : ":\\)>-",
	    "height" : 18
	  },
	  ":-j" : {
	    "width" : 26,
	    "alt" : "oh go on",
	    "src" : "Share/css/78.gif",
	    "text" : ":-j",
	    "regexp" : ":-j",
	    "height" : 18
	  },
	  "%%-" : {
	    "width" : 18,
	    "alt" : "good luck",
	    "src" : "Share/css/54.gif",
	    "text" : "%%-",
	    "regexp" : "%%-",
	    "height" : 18
	  },
	  "%-(" : {
	    "width" : 52,
	    "alt" : "not listening",
	    "src" : "Share/css/87.gif",
	    "text" : "%-(",
	    "regexp" : "%-\\(",
	    "height" : 18
	  },
	  ":p" : {
	    "width" : 18,
	    "alt" : "tongue",
	    "src" : "Share/css/10.gif",
	    "text" : ":P",
	    "regexp" : ":P",
	    "height" : 18
	  },
	  "^:)^" : {
	    "width" : 32,
	    "alt" : "not worthy",
	    "src" : "Share/css/77.gif",
	    "text" : "^:)^",
	    "regexp" : "\\^:\\)\\^",
	    "height" : 18
	  },
	  ":-\"" : {
	    "width" : 22,
	    "alt" : "whistling",
	    "src" : "Share/css/65.gif",
	    "text" : ":-\"",
	    "regexp" : ":-\\x22",
	    "height" : 18
	  },
	  ":-<" : {
	    "width" : 24,
	    "alt" : "sigh",
	    "src" : "Share/css/46.gif",
	    "text" : ":-<",
	    "regexp" : ":-<",
	    "height" : 18
	  },
	  ":o3" : {
	    "width" : 31,
	    "alt" : "puppy dog eyes",
	    "src" : "Share/css/88.gif",
	    "text" : ":o3",
	    "regexp" : ":o3",
	    "height" : 18
	  },
	  ">:)" : {
	    "width" : 18,
	    "alt" : "devil",
	    "src" : "Share/css/19.gif",
	    "text" : ">:)",
	    "regexp" : ">:\\)",
	    "height" : 18
	  },
	  "=;" : {
	    "width" : 18,
	    "alt" : "talk to the hand",
	    "src" : "Share/css/27.gif",
	    "text" : "=;",
	    "regexp" : "=;",
	    "height" : 18
	  },
	  "8-|" : {
	    "width" : 18,
	    "alt" : "rolling eyes",
	    "src" : "Share/css/29.gif",
	    "text" : "8-|",
	    "regexp" : "8-\\|",
	    "height" : 18
	  },
	  "**==" : {
	    "width" : 25,
	    "alt" : "flag",
	    "src" : "Share/css/55.gif",
	    "text" : "**==",
	    "regexp" : "\\*\\*==",
	    "height" : 18
	  },
	  "o-+" : {
	    "width" : 18,
	    "alt" : "april",
	    "src" : "Share/css/74.gif",
	    "text" : "o-+",
	    "regexp" : "o-+",
	    "height" : 18
	  },
	  "8-}" : {
	    "width" : 24,
	    "alt" : "silly",
	    "src" : "Share/css/35.gif",
	    "text" : "8-}",
	    "regexp" : "8-}",
	    "height" : 18
	  },
	  "=))" : {
	    "width" : 30,
	    "alt" : "rolling on the floor",
	    "src" : "Share/css/24.gif",
	    "text" : "=))",
	    "regexp" : "=\\)\\)",
	    "height" : 18
	  },
	  ":-l" : {
	    "width" : 18,
	    "alt" : "frustrated",
	    "src" : "Share/css/62.gif",
	    "text" : ":-L",
	    "regexp" : ":-L",
	    "height" : 18
	  },
	  "b-)" : {
	    "width" : 18,
	    "alt" : "cool",
	    "src" : "Share/css/16.gif",
	    "text" : "B-)",
	    "regexp" : "B-\\)",
	    "height" : 18
	  },
	  ";)" : {
	    "width" : 18,
	    "alt" : "winking",
	    "src" : "Share/css/3.gif",
	    "text" : ";)",
	    "regexp" : ";\\)",
	    "height" : 18
	  },
	  ":>" : {
	    "width" : 18,
	    "alt" : "smug",
	    "src" : "Share/css/15.gif",
	    "text" : ":>",
	    "regexp" : ":>",
	    "height" : 18
	  },
	  ":-&" : {
	    "width" : 18,
	    "alt" : "sick",
	    "src" : "Share/css/31.gif",
	    "text" : ":-&",
	    "regexp" : ":-&",
	    "height" : 18
	  },
	  "<):)" : {
	    "width" : 18,
	    "alt" : "cowboy",
	    "src" : "Share/css/48.gif",
	    "text" : "<):)",
	    "regexp" : "<\\):\\)",
	    "height" : 18
	  },
	  ":-s" : {
	    "width" : 18,
	    "alt" : "worried",
	    "src" : "Share/css/17.gif",
	    "text" : ":-S",
	    "regexp" : ":-S",
	    "height" : 18
	  },
	  ";))" : {
	    "width" : 18,
	    "alt" : "hee hee",
	    "src" : "Share/css/71.gif",
	    "text" : ";))",
	    "regexp" : ";\\)\\)",
	    "height" : 18
	  },
	  "[-o<" : {
	    "width" : 18,
	    "alt" : "praying",
	    "src" : "Share/css/63.gif",
	    "text" : "[-O<",
	    "regexp" : "\\[-O<",
	    "height" : 18
	  },
	  "@};-" : {
	    "width" : 18,
	    "alt" : "rose",
	    "src" : "Share/css/53.gif",
	    "text" : "@};-",
	    "regexp" : "@};-",
	    "height" : 18
	  }
};


/**
* @link http://iamceege.github.io/tooltipster/#demos
* Hien thi tinh nang chon emoticon len cua so chat	
* @param {string} container id of button
* @param {String} parent dchat object
* @param {String} id id of friend (or window)
*/
Emoticon.prototype.show = function(container, parent, id){
    var that = this;
    $(container).tooltipster({
        content: $(that._emoticons()),
        animation: "fade",
        delay: 100,
        trigger: "click",
        theme: "tooltipster-shadow",
        functionReady: function(event){
            /**more http://api.jquery.com/delegate*/
            $(".emoticon_area_" + that.friendNick).off();
            // clear all bind before add?
            $(".emoticon_area_" + that.friendNick).on("click", "#emo", function(){
                var emo = $(this).attr("class");
                // Display this emoticon to the chat content
                var content = Emoticon.emToString(emo);
                parent.addMsg(Emoticon.translateToEmo(content), id, true);
                $(container).tooltipster("destroy");
                // Goi request gui message
                var data = {};
                data.to = id + "@" +parent.resource + "/xmpp" ;
                data.type = "chat";
                data.content = content;
                var connection = new SOAPRequest({container: parent});
                connection.cancelPoll();
                connection.SendMessageRequest(data);
            });
        },
        interactive: true// Phai bat thuoc tinh nay de co the thao tac voi cac doi tuong tren tooltip
    });
    $(container).tooltipster("show");
};

/**
* Translate emoticon to string
* @param {string} str emoticon can chuyen sang string
*/
Emoticon.emToString = function(str){
	var index =  str.match(/\d+$/)[0];
	return Emoticon.reverseHash[index -1];
};

/**
* Translate from string to emoticons
*/
Emoticon.translateToEmo = function(content){
	var iscontinue = true;
	var startIndex = 0;
	var output = [];
	while(iscontinue){
		this.regexp.lastIndex = startIndex;
		var m = Emoticon.regexp.exec(content);
		if(m === null){
			iscontinue = false;
		}else{
			var index = m.index;
			output.push(content.substring(startIndex, index));
			var length = m[1].length;
			startIndex = index + length;
			var data = Emoticon.hash[m[0]];
			var img = "<img src='" + data.src + "' alt='"  + data.alt +"' height='" + data.height + "' width='" +data.width + "'/>";
			output.push(img);			
		}
	}
	output.push(content.substring(startIndex, content.length));
	return output.join("");
};

/**
* Danh sach cac emoticon
* @link http://www.hongkiat.com/blog/beautiful-emoticons-and-smiley-icon-packs/
*/
Emoticon.prototype._emoticons = function(){
	var html = new Array();
	html.push("<div id='emoticon_area' class='emoticon_area_" + this.friendNick + "'>");
	for(var i = 1; i < 87; i++){
		html.push("<div id='emo' class='ImgVmailEmo_" + i + "'></div>");
	}
	html.push("</div>");
	return html.join("");
};