import React from 'react';
import './StoryPostView.sass';
import '../TestimonialsView/TestimonialsView.sass';

import PricePlans from 'components/PricePlans';
import WeightLossFilters from 'components/WeightLossFilters';
import SuggestedPeopleSlider from 'components/SuggestedPeopleSlider';
import TrialBanner from 'components/TrialBanner';


const StoryPostView = () => {

  return (
    <>
      <section className='story-post-page'>
        
        <div className='container'>
          <WeightLossFilters />
        </div>

        <div className='container container__wrap'>
          <div className='row'>
            <div className='col-7'>

              <div className='story-post-page_user-info card-bg'>
                <h4>Hanna Liisa Remmelg</h4>
                <div className='story-post-page_user-info_stats'>
                  <div className="story-post-page_user-info_stats-item">21</div>
                  <div className="story-post-page_user-info_stats-item">84 kg start</div>
                  <div className="story-post-page_user-info_stats-item">result 60 kg</div>
                </div>
              </div>

              <div className='story-post-page_post'>
                <h5>Kuidas kaalukaotus minu elu muutis...</h5>
                <br/>
                <p>
                  Olen olnud alati väga sportlik inimene. ka 84 kg käisin koeraga iga päev 10 kg ringidel, seega kõrgem kaal pole mingi kunagi otseselt häirinud. Ja alati mõtles "ma pole ju nii paks, et keegi tänaval järgi vaataks, seega kõik on korras". Samas oli palju riideid, mis nn "ei sobinud minu kehakujuga, kuid nüüd mõistan, et tegelikult oli asi ülekilodes! Nüüd saan rahumeeli kanda ka rohkem ümber kleite ning kogun komplimente igapäev. Kõige suurem muutust on vast, see et kodus mees ei lakka komplimente tegemast, ning peeglisse vaadates tunnen ennast päriselt ka ilusana.</p>
                <br/>
                <p>
                  On nädalaid, kus söön mitu mäeva järjest vaid Fitlap kooke ning küpsetisi. Kui tekib isu mingi asja järgi panen selle endale kirja. Meil on mehega selline list, kuhu kirjutame nädala jooksul kõik isud. Nii uskumatuna, kui see kõlab, siis ülesse kirjutamine võtab isu ära! Ning laupäeva pärastlõunal, kui meil patukord on, siis võtame selle listi uuesti ette, ning sööme isud ära :)</p>
                <br/>
                <p>
                  Samuti on suureks motivaatoriks vanade piltide vaatamien ning suureks jäänud riiete selgaproovimine :)</p>
                <br/>
                <img
                  src='https://fitstg.s3.eu-central-1.amazonaws.com/kaidi_laan.png'
                  alt=""
                  className='story-post-page_post-img'
                />
                <br/>
                <h5>Minu 5 soovitust teistele kasutajatele:</h5>
                <br/>
                <p>
                  - Kõigil on kapis mingi riideese, mis vastab kirjeldusele "oh kunagi mahtus see mulle selga, hetkel ei mahu, aga ma ei viska seda veel ära, sest äkki kunagi mahub jälle" liitu</p>
                <br/>
                <p>
                  - Fitlapiga ja see kunagi pole enam üldse kaugel!
                </p>
                <br/>
                <p>
                  - Alusta koos sõbranna, elukaaslase või perega. Koos on teineteist lihtsam motiveerida ning reel püsida.
                </p>
                <br/>
                <p>
                  - Karta pole mitte midagi! Paljud kardavad, et peavad ennast näljutama. Fitlapiga ei pea.
                </p>
                <br/>
                <p>
                  - Tervisliku eluviisiga on eluiga pikem.
                </p>
                <br/>
                <p>
                  - Fitlapiga sa päriselt saadki suveks vormi nagu sa iga aasta alguses lubad.
                </p>
              </div>

            </div>

            <div className="col-5">
              <SuggestedPeopleSlider />
              <TrialBanner />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div>
                <h3 className='story-post-page_tariff-title'>
                  Choose a period and join
                </h3>
                <PricePlans />
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default StoryPostView;
