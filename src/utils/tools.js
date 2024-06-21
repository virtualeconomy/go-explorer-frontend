import base58 from 'bs58'

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
const setipfsIconUrlName = (str, index) => {
    const BuseUrl = [
        'gateway.ipfs.io',
        'gateway.pinata.cloud',
        'cloudflare-ipfs.com',
        'gateway.ipfs.io',
        'gateway.pinata.cloud',
        'gateway.pinata.cloud',
        'gateway.ipfs.io',
        'gateway.pinata.cloud',
        'gateway.pinata.cloud',
        'gateway.ipfs.io',
        'gateway.ipfs.io',
        'gateway.pinata.cloud',
        'gateway.ipfs.io',
        'gateway.pinata.cloud',
        'cloudflare-ipfs.com',
        'cloudflare-ipfs.com',
    ]
    let IconUrl = ''
    let Name = ''
    let CollectionName = ''
    let url = ''
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
        if (url.img) {
            IconUrl = 'https://' + BuseUrl[index % 16] + '/ipfs/' + url.img
        } else if (url.image) {
            IconUrl = 'https://' + BuseUrl[index % 16] + '/ipfs/' + url.image
        } else if (url.content) {
            IconUrl = 'https://' + BuseUrl[index % 16] + '/ipfs/' + url.content
        } else if (url.ipfs_json_file) {
            let result = (getNftimg(url.ipfs_json_file)).data?.image
            IconUrl = result
        } else if (url.url) {
            IconUrl = url.url
            Name = url.properties?.name
        }
        if (url.name) {
            CollectionName = url.name
        }
    }
    return { IconUrl, Name, CollectionName }
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
    isVSYSToken,
}