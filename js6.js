
function tablecreate(array = sagirdler) {
    document.querySelector('table').classList.remove('gizlet');
    document.querySelector('tbody').innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        let sagird = array[i];
        let yazi = ` <tr id="${sagird.id}">
        <td id="ad" >${sagird.ad}</td>
        <td id="soyad">${sagird.soyad}</td>
        <td id="ders">${sagird.ders}</td>
        <td id="il">${sagird.il}</td>
        <td id="sil">-</td>
         </tr>`;
        document.querySelector('tbody').innerHTML += yazi;

    }

}


document.querySelector('#qeydet').addEventListener('click', function (e) {

    let ad = document.querySelector('#ad').value;
    let soyad = document.querySelector('#soyad').value;
    let ders = document.querySelector('#ders').value;
    let il = document.querySelector('#il').value;

    if (ad == "" || ad == null) {
        return;
    }

    let id = "";
    if (e.target.dataset.randomid.length > 0) {
        id = e.target.dataset.randomid;
    }
    else {
        id = Random();
    }




    let yeniSagird = {
        id: id,
        ad: ad,
        soyad: soyad,
        ders: ders,
        il: il
    };

    if (e.target.dataset.randomid.length > 0) {
        for (let i = 0; i < sagirdler.length; i++) {
            let sagird = sagirdler[i];
            if (sagird.id == id) {
                sagirdler[i] = yeniSagird;
            }
        }
    }
    else {
        sagirdler.push(yeniSagird);
    }

    tablecreate();

    document.querySelector('#ad').value = "";
    document.querySelector('#soyad').value = "";
    document.querySelector('#il').value = "";
    document.querySelector('#ders').value = "";
}

);


document.querySelector('#qeydet').addEventListener('click', function () {
    document.querySelector('thead').classList.add('mavi-basliq')
});

document.querySelector('tbody').addEventListener('dblclick', function (e) {

    let td = e.target;
    let tr = td.parentElement;
    if (td.id == "sil") {
        sagirdler = sagirdler.filter(x => x.id != tr.id);

        tablecreate();
        return;
    }

    let tdler = tr.children;
    document.querySelector('#ad').value = tdler[0].innerHTML;
    document.querySelector('#soyad').value = tdler[1].innerHTML;
    document.querySelector('#ders').value = tdler[2].innerHTML;
    document.querySelector('#il').value = tdler[3].innerHTML;

    document.querySelector('#qeydet').dataset.randomid = tr.id;

});

document.querySelector('#axtar').addEventListener('input', function (e) {
    let yazi = e.target.value.toLowerCase();
    yeniSagirdler = sagirdler.filter((x) => {
        return x.ad.toLowerCase().includes(yazi) || x.soyad.toLowerCase().includes(yazi) ||
            x.ders.toLowerCase().includes(yazi) || x.il.toLowerCase().includes(yazi);
    })
    tablecreate(yeniSagirdler);
})


let thlar = document.querySelectorAll('th');
for (let i = 0; i < thlar.length; i++) {
    let th = thlar[i];
    th.addEventListener('click', function (e) {
        e.target.classList.toggle('grey');
        let klassvarmi = classvarmi('grey', e.target);
        let prop = e.target.dataset.prop;
        let yeniSagirdler = sagirdler.sort((a, b) => {
            let ad1 = a[prop];
            let ad2 = b[prop];
            if (klassvarmi == true) {
                return ad1.localeCompare(ad2);
            } else {
                return ad2.localeCompare(ad1);
            }

        })
        tablecreate(yeniSagirdler);
    })
}

function classvarmi(klas, element) {
    let klaslar = element.classList;
    for (let i = 0; i < klaslar.length; i++) {
        let clas = klaslar[i];

        if (clas == klas) {
            return true;
        }
    }
    return false;

}