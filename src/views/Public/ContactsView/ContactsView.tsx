import React, { useState } from 'react';
import { connect } from 'react-redux';

import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import RegisterModal from 'components/RegisterModal';
import Map from 'components/common/Map';

import './ContactsView.sass';

const ContactsView = (props: any) => {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
      <div className='contacts'>
        <section className='contacts__welcome'>
          <div className='container'>
            <div className='row d-flex align-items-center'>
              <div className='col-6'>
                <h2 className='mb-5 contacts__welcome-title'>Contacts</h2>
                <p className='mb-5 contacts__welcome-description'>
                  sulle ja su perele sulle ja su perelesulle ja su perelesulle
                  ja su perelesulle ja su perelesulle ja su perelesulle ja su
                  perelesulle ja su perelesulle ja su perele sulle ja su perele
                  sulle ja su perelesulle ja su perelesulle ja su perelesulle ja
                  su perelesulle ja su perelesulle ja su perelesulle ja su
                  perelesulle ja su perele
                </p>
                <Button
                  color='primary'
                  onClick={() => setRegisterModalOpen(!isRegisterModalOpen)}
                >
                  Register
                </Button>
              </div>
              <div className='col-6'>
                <div className='contacts__welcome-media-wrap'>
                  <img
                    src={require('../../../assets/img/team.png')}
                    alt=''
                    className='contacts__welcome-media'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='contacts__counseling'>
          <div className='container'>
            <h3 className='contacts__counseling-title'>
              Provides human nutrition counseling
            </h3>
            <div className='contacts__counseling-container'>
              <p>Saaja: OÜ Fitlap</p>
              <p>Saaja aadress: Riistapuu 19, Tartu, Tartu maakond 51017</p>
              <p>
                Panga aadress: Swedbank As, 8 Liivalaia Street, 15040, Tallinn,
                Estonia
              </p>
              <p>SWIFT kood/BIC: HABAEE2X</p>
              <p>IBAN: EE822200221061258052</p>
              <p className='mb-5'>Selgitusse lisage enda nimi ja e-mail</p>
              <p className='mb-5'>
                Kui tasute ülekandega, lisame teile kasutusaja 1-2 tööpäeva
                jooksul. Kohe saame kasutusaja lisada teie kontole, kui saadate
                meile maksekorralduse
                <a
                  href='mailto:info@fitlap.ee'
                  className='contacts__counseling-link'
                >
                  info@fitlap.ee
                </a>
                .
              </p>
              <p>
                Kui teil on küsimusi, siis saate kirjutada meile
                <a
                  href='mailto:info@fitlap.ee'
                  className='contacts__counseling-link'
                >
                  info@fitlap.ee.
                </a>
              </p>
              <p>Telefon 5560 8413.</p>
            </div>
          </div>
        </section>
        <section className='contacts__map'>
          <div className='container'>
            <div id='map'>
              <Map
                weight='100%'
                height='480px'
                place='belarus, homel, sovetskaya 144'
              />
            </div>
          </div>
        </section>
        <section className='contacts__team'>
          <div className='container'>
            <h3 className='contacts__team-title'>Our team</h3>
            <div className='row contacts__team-list'>
              <div className='col-md-6 contacts__team-list-item'>
                <div className='row'>
                  <div className='col-6 mb-4 mb-sm-0 contacts__team-list-item-media'>
                    <img
                      src={require('../../../assets/img/vihhoreva-face.png')}
                      alt=''
                      className='contacts__team-list-item-media-img'
                    />
                    <div className='contacts__team-list-item-media-name'>
                      Irina Vihhoreva
                    </div>
                  </div>
                  <div className='col-6 contacts__team-list-item-description'>
                    <p>
                      René on Fitlapi üks asutajatest. Ta on tegelenud nii
                      Fitlapi arendamise kui ka turundamisega. Nüüd on ta
                      Fitlapi ärijuht.
                    </p>
                    <p>
                      René on tegelenud Eesti tipptasemel poksi, jõutõstmise ja
                      Fitness5´ga ning andnud treeningu- ja toitumisalast nõu
                      nii sportlastele kui ka tavainimestele, nii
                      kaalulangetajatele kui neile, kes soovivad lihaseid või
                      jõudu suurendada. René´le meeldib tegeleda võistlevate
                      sportlastega.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md-6 contacts__team-list-item'>
                <div className='row'>
                  <div className='col-6 mb-4 mb-sm-0 contacts__team-list-item-media'>
                    <img
                      src={require('../../../assets/img/vihhoreva-face.png')}
                      alt=''
                      className='contacts__team-list-item-media-img'
                    />
                    <div className='contacts__team-list-item-media-name'>
                      Irina Vihhoreva
                    </div>
                  </div>
                  <div className='col-6 contacts__team-list-item-description'>
                    <p>
                      René on Fitlapi üks asutajatest. Ta on tegelenud nii
                      Fitlapi arendamise kui ka turundamisega. Nüüd on ta
                      Fitlapi ärijuht.
                    </p>
                    <p>
                      René on tegelenud Eesti tipptasemel poksi, jõutõstmise ja
                      Fitness5´ga ning andnud treeningu- ja toitumisalast nõu
                      nii sportlastele kui ka tavainimestele, nii
                      kaalulangetajatele kui neile, kes soovivad lihaseid või
                      jõudu suurendada. René´le meeldib tegeleda võistlevate
                      sportlastega.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md-6 contacts__team-list-item'>
                <div className='row'>
                  <div className='col-6 mb-4 mb-sm-0 contacts__team-list-item-media'>
                    <img
                      src={require('../../../assets/img/vihhoreva-face.png')}
                      alt=''
                      className='contacts__team-list-item-media-img'
                    />
                    <div className='contacts__team-list-item-media-name'>
                      Irina Vihhoreva
                    </div>
                  </div>
                  <div className='col-6 contacts__team-list-item-description'>
                    <p>
                      René on Fitlapi üks asutajatest. Ta on tegelenud nii
                      Fitlapi arendamise kui ka turundamisega. Nüüd on ta
                      Fitlapi ärijuht.
                    </p>
                    <p>
                      René on tegelenud Eesti tipptasemel poksi, jõutõstmise ja
                      Fitness5´ga ning andnud treeningu- ja toitumisalast nõu
                      nii sportlastele kui ka tavainimestele, nii
                      kaalulangetajatele kui neile, kes soovivad lihaseid või
                      jõudu suurendada. René´le meeldib tegeleda võistlevate
                      sportlastega.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md-6 contacts__team-list-item'>
                <div className='row'>
                  <div className='col-6 mb-4 mb-sm-0 contacts__team-list-item-media'>
                    <img
                      src={require('../../../assets/img/vihhoreva-face.png')}
                      alt=''
                      className='contacts__team-list-item-media-img'
                    />
                    <div className='contacts__team-list-item-media-name'>
                      Irina Vihhoreva
                    </div>
                  </div>
                  <div className='col-6 contacts__team-list-item-description'>
                    <p>
                      René on Fitlapi üks asutajatest. Ta on tegelenud nii
                      Fitlapi arendamise kui ka turundamisega. Nüüd on ta
                      Fitlapi ärijuht.
                    </p>
                    <p>
                      René on tegelenud Eesti tipptasemel poksi, jõutõstmise ja
                      Fitness5´ga ning andnud treeningu- ja toitumisalast nõu
                      nii sportlastele kui ka tavainimestele, nii
                      kaalulangetajatele kui neile, kes soovivad lihaseid või
                      jõudu suurendada. René´le meeldib tegeleda võistlevate
                      sportlastega.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(ContactsView));
