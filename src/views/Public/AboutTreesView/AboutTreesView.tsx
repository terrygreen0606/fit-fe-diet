import React from 'react';
import './AboutTreesView.sass';

const AboutTreesView = () => (
  <div className='tree'>
    <div className='tree__goal'>
      <div className='container'>
        <h3 className='tree__goal-title'>
          To reforest the world. We look forward to planting trees with you and
          contribute together to a better planet.
        </h3>
        <p className='tree__goal-limited-text'>
          OÜ Fitlap registrikood 12780210, aadress Narva mnt 9, Tartu 51009,
          Eesti Vabariik; kontakttelefon +372 5559 8075, e-mail
          klienditugi@fitlap.ee; edaspidi teenusepakkuja) teenuseid on võimalik
          osta registreerudes www.fitlap.ee veebikeskkonnas kasutajaks.
        </p>
        <ol className='tree__goal-list'>
          <li className='tree__goal-list-item tree__goal-limited-text'>
            Kasutaja käesolevate tingimuste tähenduses on isik, kes on oma
            andmed registreerinud fitlap.ee keskkonnas ning saanud enda kasutada
            parooliga kaitstud kasutajakonto.
          </li>
          <li className='tree__goal-list-item tree__goal-limited-text'>
            Informatsioon käesolevate tingimuste tähenduses on fitlap.ee
            veebikeskkonnas kättesaadavad treeningu- ja toitumisjuhised,
            personaalsed treeningu- ja toitumiskavad, teenusepakkuja poolt
            avaldatud artiklid ja muud teosed, millele tekib Eesti Vabariigi
            autoriõiguse seaduse § 4 tähenduses autoriõigus.
          </li>
          <li className='tree__goal-list-item tree__goal-limited-text'>
            Teenusepakkuja ei paku teenuseid alla 18-aastastele isikutele.
            Kasutajaks registreerides kinnitab isik, et ta on vähemalt
            18-aastane.
          </li>
          <li className='tree__goal-list-item tree__goal-limited-text'>
            Teenusepakkuja jagab kasutajale treeningu- ja toitumissoovitusi
            lähtudes kasutaja profiilil olevatest andmetest. Kasutaja vastutab
            enda loodud profiilil kajastuvate andmete õigsuse eest.
          </li>
          <li className='tree__goal-list-item'>
            Kasutaja teadvustab endale, et treeningu- ja toitumisjuhiste
            järgimine ei ole kohustuslik, vaid nende eesmärk on anda kasutajale
            soovituslikku teavet.
          </li>
          <li className='tree__goal-list-item'>
            Kasutaja teeb lõplikud treeningu- ja toitumisalased otsused ise,
            kasutades selleks oma parimat äranägemist ning lähtudes oma
            tervislikust seisundist.
          </li>
        </ol>
      </div>
      <div className='tree__goal-media'>
        <img
          src='https://fitstg.s3.eu-central-1.amazonaws.com/tree.png'
          alt=''
          className='tree__goal-media-img'
        />
        <div className='tree__goal-media-text'>
          <div className='tree__goal-media-text-title'>1 Month = 1TREE</div>
          <div className='tree__goal-media-text-sub-title'>
            More than 2500 have join edus in our mission
          </div>
        </div>
      </div>
    </div>
    <div className='container'>
      <div className='tree__description'>
        <img
          src='https://fitstg.s3.eu-central-1.amazonaws.com/sprout.png'
          alt=''
          className='tree__description-media'
        />
        <h4 className='tree__description-title'>
          Teenusepakkuja määratletud isikuandmete kogumine on kasutajakonto
          loomise ning teenuste kasutamise eelduseks.
        </h4>
        <p>
          Teenusepakkuja kogub kasutaja kohta järgmisi isikuandmeid: nimi,
          e-mailiaadress, aadress, Facebooki kaudu liitumisel Facebooki kaudu
          isiku autentimisel kasutatavad andmed, vanus, kehakaal, pikkus, sugu,
          eesmärk (kas kaalu tõsta või langetada), kasutatav spordiklubi.
          www.fitlap.ee veebikeskkonda kasutades on võimalik teenuspakkujal
          tuvastada ka kasutaja IP-aadress ning asukoht.
        </p>
        <p>
          Kasutaja saab aru, et tehes kasutajakeskkonnas blogipostitusi,
          muutuvad need avalikuks ning teenusepakkujal on õigus postitusi jagada
          oma valitud veebilehtedel. Blogipostituste tegemine ei ole teenuste
          kasutamise eelduseks ega kasutajale kohustuslik.
        </p>
        <p>
          Teenusepakkujale saavad kasutaja isikuandmed teatavaks kasutajakonto
          loomisel ning kasutajakonto edasisel kasutamisel.
        </p>
        <p>
          Teenusepakkuja kasutab andmete kogumiseks ka küpsiseid, et muuta
          veebilehe kasutuskogemus kasutajatele isikupärasemaks ning mugavamaks,
          sh edastada kasutajale vastavalt nende harjumustele personaalseid
          pakkumisi või reklaame. Küpsistest loe soovi korral lähemalt siit:
          küpsiste kasutamine.
        </p>
        <p>
          Kasutaja isikuandmeid säilitatakse Euroopa Liidus asuvas
          andmekeskuses.
        </p>
        <p>
          Teenusepakkuja töötleb kasutaja isikuandmeid järgmistel eesmärkidel:
        </p>
        <ul className='tree__description-list'>
          <li className='tree__description-list-item'>
            täita kasutaja ees võetud kohustusi teenuse osutamisel, koostades
            kasutaja soovidest ja näitajatest lähtuvaid toitumis- ja
            treeningsoovitusi sisaldavaid kavasid;
          </li>
          <li className='tree__description-list-item'>
            muuta kasutaja jaoks veebikeskkonna kasutamine isikupärasemaks ning
            vajadustele vastavaks;
          </li>
          <li className='tree__description-list-item'>
            pakkuda turundustegevuse kaudu kasutajale teenusepakkuja poolt
            osutatavaid teenuseid;
          </li>
          <li className='tree__description-list-item'>
            kasutada andmeid turundustegevuse jaoks statistika tegemisel;
          </li>
          <li className='tree__description-list-item'>
            kasutada kasutaja mittepersonaalseid andmeid turundustegevuses;
          </li>
          <li className='tree__description-list-item'>
            edastada kasutajale teavet;
          </li>
          <li className='tree__description-list-item'>
            täita oma õiguslikke kohustusi.
          </li>
        </ul>
        <p>
          Teenusepakkuja töötleb kasutaja isikuandmeid üksnes kasutaja
          nõusolekul.
        </p>
        <p>
          Kasutajal on õigus igal ajahetkel võtta oma nõusolek andmete
          töötlemiseks tagasi, teavitades sellest teenusepakkujat aadressil
          info@fitlap.ee.
        </p>
        <p>
          Kasutajal on õigus igal ajahetkel nõuda teenusepakkujalt oma andmete
          muutmist, ebaõigete andmete parandamist ning oma andmete kustutamist
          või esitada vastuväide oma andmete töötlemisele, andes sellest
          teenusepakkujale teada aadressil info@fitlap.ee.
        </p>
        <p>
          Kasutajal on õigus igal ajahetkel nõuda teenusepakkujalt oma andmete
          edastamist endale või kolmandale osapoolele, andes oma soovist
          teenusepakkujale teada aadressil info@fitlap.ee.
        </p>
        <p>
          Teenusepakkuja ei edasta kasutaja isikuandmeid kolmandatele
          osapooltele, v.a. juhul, kui see on seotud kliendile parema teenuse
          pakkumisega (nt foorumi tarkvara kasutamine) või kui selleks on olemas
          kasutaja nõusolek või seadusest tulenev alus.
        </p>
        <p>
          Teenusepakkuja säilitab kasutaja isikuandmeid seni, kuni kasutajal on
          www.fitlap.ee veebikeskkonnas kasutajakonto või kuni see on vajalik
          kasutajale teenuste osutamiseks. Teenusepakkuja võib kasutaja
          isikuandmeid säilitada kauem, kui see on vajalik tema õiguslike
          kohustuste täitmiseks või vaidluse lahendamiseks.
        </p>
        <p>
          Kasutajal on kohustus viivitamatult teavitada teenusepakkujat, kui tal
          tekib vähimgi kahtlus, et tema parooliga kaitstud kasutajakontole
          pääsevad ligi kolmandad isikud, kellel puudub selleks kasutaja
          nõusolek, andes sellest teada aadressil info@fitlap.ee.
        </p>
        <p>
          Kui teenusepakkuja eksib isikuandmete töötlemise nõuete vastu, on
          kasutajal õigus pöörduda kaebusega Andmekaitseinspektsiooni poole.
        </p>
        <h4 className='tree__description-title'>AUTORIÕIGUSED</h4>
        <ul className='tree__description-list'>
          <li className='tree__description-list-item'>
            Kogu fitlap.ee veebikeskkonnas olev informatsioon on kaitstud
            autoriõigustega.
          </li>
          <li className='tree__description-list-item'>
            Kasutajad võivad informatsiooni kasutada autoriõiguse seadusega
            lubatud piirides.
          </li>
          <li className='tree__description-list-item'>
            Teenusepakkuja annab Kasutajatele õiguse muuta ja täiendada
            fitlap.ee veebikeskkonnas olevaid retsepte ning avaldada neid
            fitlap.ee kodulehel.
          </li>
          <li className='tree__description-list-item'>
            Teenusepakkujal on õigus kasutada kogu Kasutajate poolt fitlap.ee
            veebikeskkonda sisestatud ja seal avaldatud informatsiooni,
            kasutajate poolt fitlap.ee veebikeskkonda üles laetud fotosid,
            retsepte, artikleid jmt alates nende avaldamisest fitlap.ee
            veebikeskkonnas Kasutajate poolt.
          </li>
          <li className='tree__description-list-item'>
            Kasutajad annavad nende poolt fitlap.ee veebikeskkonnas avaldatud
            informatsiooni kasutamiseks teenusepakkujale lihtlitsentsi
            võlaõigusseaduse § 370 lg 1 mõttes.
          </li>
          <li className='tree__description-list-item'>
            Teenusepakkujal on õigus teostada kõiki Kasutajate poolt fitlap.ee
            veebikeskkonnas avaldatud teoste varalisi autoriõigusi autoriõiguse
            seaduse § 13 mõttes ülemaailmselt.
          </li>
          <li className='tree__description-list-item'>
            Teenusepakkujal on all-litsentsi andmise õigus.
          </li>
          <li className='tree__description-list-item'>
            Teenusepakkujal on õigus teostada Kasutajate poolt fitlap.ee
            veebikeskkonnas avaldatud informatsiooni suhtes varalisi
            autoriõigusi tasuta ning tähtajatult.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default AboutTreesView;
