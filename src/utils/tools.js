import base58 from 'bs58'
import { getNftimg } from '../api';

const toThousands = (val) => {
    val = Number(val);
    if (val !== 0) {
        let arr = String(val).split('.');
        let num = arr[0];
        let len = Math.ceil(num.length / 3) * 3;
        let result = num.padStart(len, '0').match(/\d{3}/g).join(',').replace(/^0+/, '');
        return arr[1] ? result + '.' + arr[1] : result;
    } else {
        return 0
    }
}

const formdataify = (params) => {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
        if (typeof params[key] == "string") {
            formData.append(key, params[key]);
        } else {
            formData.append(key, JSON.stringify(params[key]));
        }
    });
    return formData;
};

//Transaction TypeName
const addTypeName = (arr) => {
    arr.map((item) => {
        let TypeName = ''
        switch (item.Type) {
            case 1: TypeName = 'genesis'; break;
            case 2: TypeName = 'payment'; break;
            case 3: TypeName = 'lease'; break;
            case 4: TypeName = 'leasecancel'; break;
            case 5: TypeName = 'minting'; break;
            case 6: TypeName = 'contendslot'; break;
            case 7: TypeName = 'releaseslot'; break;
            case 8: TypeName = 'register contract'; break;
            case 9: TypeName = 'execute contract'; break;
            case 10: TypeName = 'dbput'; break;
            default: false;
        }
        item.TypeName = TypeName
    })
    return arr
}

const cutString = (str, len) => {
    if (str.length <= len) {
        return str;
    }
    var s = "";
    for (var i = 0; i < len / 2; i++) {
        s = s + str.charAt(i);
    }
    s = s + '...'
    for (var i = str.length - len / 2; i <= str.length; i++) {
        s = s + str.charAt(i);
    }
    return s;
}

//convert attachment 
const byteArrayToString = (str) => {
    let attachment = ""
    try {
        const bytes = base58.decode(str)
        attachment = decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)))
    } catch {
        attachment = "-"
    }

    return attachment
}

//set NFT ipfs IconUrl Name
const setipfsIconUrlName = async (string) => {
    let str = evalString(string)
    let IconUrl = ''
    let Name = ''
    let CollectionName = ''
    let url = ''
    let Word = ""
    if (str[0] === '{') {
        try {
            url = eval("(" + str + ")")
        } catch (error) {
            str = str.replace('', '').replace(/[\\]/g, '');
            try {
                url = eval("(" + str + ")")
            } catch (error) {
                console.log(error)
            }
        }
    } else if (isIpfsString(str)) {
        try {
            let result = await (getNftimg('https://gateway.pinata.cloud/ipfs/' + str))
            if (result.constructor === Object) {
                url = result.data ? result.data : result
            }
        } catch (error) {
            IconUrl = 'https://gateway.pinata.cloud/ipfs/' + str
        }
    } else {
        url = { DBEntry: str }
    }
    if (url.img) {
        IconUrl = 'https://gateway.pinata.cloud/ipfs/' + url.img
    } else if (url.image) {
        IconUrl = 'https://gateway.pinata.cloud/ipfs/' + url.image
    } else if (url.content) {
        IconUrl = 'https://gateway.pinata.cloud/ipfs/' + url.content
    } else if (url.ipfs_json_file) {
        try {
            let result = await (getNftimg(url.ipfs_json_file))
            if (result.constructor === Object) {
                url.ipfs_json_file = result
                IconUrl = result.data?.image
            }
        } catch (error) {
        }
    } else if (url.url) {
        IconUrl = url.url
        Name = url.properties?.name
    } else if (url.w) {
        Word = url.w
    }
    if (url.name) {
        CollectionName = url.name
    }
    if (url) {
        url = flattenObject(url)
    }
    return { IconUrl, Name, CollectionName, url, Word }
}

const evalString = (str) => {
    let string = ''
    if (str.charAt(0) == "\"") {
        try {
            string = eval("(" + str + ")")
        } catch (error) {
            str = str.replace('', '').replace(/[\\]/g, '');
            try {
                string = eval("(" + str + ")")
            } catch (error) {
                console.log(error)
            }
        }
        return evalString(string)
    } else {
        return str
    }
}

const isEvalString = (str) => {
    if (str.charAt(0) == "\"" || str.charAt(0) == "{") {
        return true
    } else {
        return false
    }
}

function isIpfsString(s) {
    // CIDv0 typically starts with Qm and is 46 characters long
    const cidv0Pattern = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/;
    // CIDv1 typically starts with b and is 59 characters long
    const cidv1Pattern = /^b[A-Za-z2-7]{58}$/;

    return cidv0Pattern.test(s) || cidv1Pattern.test(s);
}


function flattenObject(obj, parentKey = '', result = {}) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                flattenObject(obj[key], newKey, result);
            } else {
                result[newKey] = obj[key];
            }
        }
    }
    return result;
}


const isVSYSToken = (token) => {
    if ((process.env.DEPLOY_MODE === 'test' && token == "TWuKDNU1SAheHR99s1MbGZLPh1KophEmKk1eeU3mW") ||
        (process.env.DEPLOY_MODE === 'prod' && token == "TWatCreEv7ayv6iAfLgke6ppVV33kDjFqSJn8yicf")) {
        return true
    }
}

export {
    toThousands,
    formdataify,
    addTypeName,
    cutString,
    byteArrayToString,
    setipfsIconUrlName,
    isEvalString,
    isVSYSToken,
}