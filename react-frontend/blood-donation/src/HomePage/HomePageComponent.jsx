import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./HomePage.css";
import crvena_kap from '../crvena_kap.png';
import tablica from '../tabela_KG.png';


class HomePageComponent extends Component {

    constructor(props) {
        super(props)
        this.state={
            showTablica:true,
            showDarovanje:false,
            showKontakti:false,
            showPitanja:false,
            showMoguce:false
        }
        this.changeContent = this.changeContent.bind(this)
    }



    changeContent (e,tekst) {
        this.state.showTablica=false;
        this.state.showDarovanje=false;
        this.state.showKontakti=false;
        this.state.showPitanja=false;
        this.state.showMoguce=false;
        if (tekst===1) this.setState({showTablica:true})
        if (tekst===2) this.setState({showDarovanje:true})
        if (tekst===3) this.setState({showKontakti:true})
        if (tekst===4) this.setState({showMoguce:true})
        if (tekst===5) this.setState({showPitanja:true})

    }


    render() {
        return (
            <div className="frame">
                <div className="header">
                    <div className="headerFrame">
                        <img className="kap_img" src={crvena_kap} alt="Crvena kap"/>
                    </div>
                    <div className="headerFrame">
                        <p>Federalna bolnica +387 33 123 456</p>
                        <h1>Doniranje krvi u Bosni i Hercegovini</h1>
                    </div>
                    
                </div>
                <div className="frameRow">
                <div className="lijevi">
                    <button className="ListaButtona" onClick={(e)=> {this.changeContent(e,1)}}>Tablica krvnih grupa</button>
                    
                    <button className="ListaButtona" onClick={(e)=> {this.changeContent(e,2)}}>Zašto darovati krv?</button>
                    
                    <button className="ListaButtona" onClick={(e)=> {this.changeContent(e,3)}}>Kontakt informacije, gdje i kada?</button>
                    
                    <button className="ListaButtona" onClick={(e)=> {this.changeContent(e,4)}}>Koliko često je moguće darovati krv?</button>
                    
                    <button className="ListaButtona" onClick={(e)=> {this.changeContent(e,5)}}>Česta pitanja o darivanju krvi</button>
                </div>
                <div className="sredina">
                    <label className="naslov"><u>Spasimo živote zajedno, donirajte krv.</u></label>
                    <br/>
                    <br/>
                    
                    {this.state.showTablica? 
                    <div>

                         <p className="paragraf">U tabeli su oznaćene pozitivne kompatibilnosti krvnih grupa primaoca i donatora. <br/>
                        Dvije specifične krvne grupe su AB+ i 0-. Osoba čija je krvna grupa AB+ je univerzalni primalac.<br/>
                         A osoba čija je krvna grupa 0- je univerzalni davalac.</p>
                        <img className="img" src={tablica}/>
                    </div>
                    :null}
                    
                    {this.state.showDarovanje? 
                    <div>
                        <label className="naslov"> Zašto darovati krv?</label>
                        <p className="paragraf"> 
                        Krv je nezamjeniv lijek povrijeđenima, oboljelim od hematoloških i onkoloških oboljenja, <br/>
                        oboljelim kojima je potrebna hirurška intervencija itd.<br/><br/>
                        Krv se ne može prozvesti, jedini način pomoći osobama kojim je potrebna krv je darovanjem iste. <br/>
                        Darovanje krvi predstavlja sponu između zdravog i bolesnog dijela populacije.<br/> 
                        Da bi se obezbijedio ovaj lijek za one kojim je najpotrebniji potrebno je animirati što <br/>
                         veći broj populacije koji žele pomoći drugima.</p>
                    </div>
                    :null}

                    {this.state.showKontakti? 
                    <div>
                         <label className="naslov">Kontakt informacije:</label>
                        <br/>
                        <br/>
                        <label>Adresa</label>
                        <p className="paragraf"> 
                        Zavod za transfuzijsku medicinu Federacije Bosne i Hercegovine <br/>
                            Čekaluša 86, 71000 Sarajevo<br/>
                            Bosna i Hercegovina<br/>Web: www.ztmfbih.ba<br/>e-mail: ztm@ztmfbih.ba</p>
                        <label>Odsjek za promociju davalaštva:</label>
                            <p className="paragraf">Tel: +387 33 567 304 <br/>
                            Tel: +387 33 567 302<br/>
                            e-mail: animacija@ztmfbih.ba </p>
                        <label className="naslov">Kada i gdje je moguće darovati krv?</label>
                        <br/>
                        <br/>
                        <p className="paragraf"> 
                        Darovati krv možete od ponedjeljka do petka u Zavodu za transfuzijsku medicinu FBiH.<br/>
                        Zavod za transfuzijsku medicinu se nalazi u ulici Čekaluša 86 u neposrednoj blizini <br/>Medicinskog fakulteta i Srednje Zubotehničke škole</p>
                    </div>
                    :null}

                    {this.state.showMoguce? 
                    <div>
                        <label className="naslov">Koliko često je moguće darovati krv?</label>
                        <br/>
                        <br/>
                        <label>Muškarci</label>
                        <p className="paragraf"> 
                        Muškarci mogu darovati krv 4 puta godišnje, odnosno svaka 3 mjeseca.</p>
                        <label>Žene</label>
                        <p className="paragraf">
                        Žene mogu darovati krv 3 puta godišnje, odnosno svaka 4 mjeseca.</p>
                    </div>
                    :null}
                    {this.state.showPitanja? 
                    <div>
                         <label className="naslov">Česta pitanja o darivanju krvi</label>
                        <br/>
                        <br/>
                        <label className="naslov">ŠTETI LI DARIVANJE KRVI ZDRAVLJU?</label>
                        <p className="paragraf"> 
                        Darivanje krvi ne šteti zdravlju ako se provedu svi propisani postupci pri odabiru darivaoca krvi.<br/> 
                        Svaka zdrava osoba između 18 i 65 godina starosti može bez opasnosti za svoje zdravlje darovati krv, <br/>
                        3 do 4 puta u toku jedne godine.<br/>
                        Zdrav organizam darivaoca krvi vrlo brzo u potpunosti nadoknađuje količinu i sve sastavne dijelove<br/>
                         darovane krvi: već unutar 24 sata organizam nadoknadi tekući dio krvi - plazmu i njene sastojke, <br/>
                         broj trombocita i leukocita. Eritrociti se nadoknade unutar 4 do 6 sedmica.<br/>
                         Darivanje krvi najviše utječe na željezo koje se u obliku hemoglobina nalazi u eritrocitima <br/>
                         (crvene krvne stanice). Darivanjem 450 mL krvi darivalac gubi oko 200 mg željeza. <br/>
                         Organizam nadoknađuje gubitak željeza u roku 1 do 2 mjeseca povećanom apsorpcijom iz hrane.<br/>
                         Prije svakog darivanja krvi obavezno provjeravamo zdravstveno stanje darivaoca krvi i<br/>
                          vrijednost hemoglobinau njegovoj krvi.</p>

                        <label className="naslov">MOŽE LI SE DARIVANJEM KRVI ZARAZITI OD NEKE BOLESTI?</label>
                        <p className="paragraf">
                        Mogućnost zaraze u toku darivanja krvi ne postoji.<br/>
                        Sav pribor za uzimanje krvi - igle, plastične kese i ostali materijal koji se koristi <br/>
                         prilikom uzimanja krvi su sterilni i za jednokratnu su upotrebu. Pribor je napravljen <br/>
                         na način koji onemogućuje njegovu ponovnu upotrebu.</p>

                         <label className="naslov">RAZVIJA LI SE OVISNOST ZA DARIVANJE KRVI?</label>
                        <p className="paragraf">
                        Darivanje krvi ne uzrokuje ovisnost!<br/>
                        Darivanje krvi može se započeti i prestati u svako doba između 18. i 65. godine života.<br/>
                        Darivanjem krvi ne nastaju nikakve štetne tjelesne promjene ili posljedice po organizam.<br/>
                        Neki ljudi se ipak bolje osjećaju nakon što daruju krv i zato daruju krv nekoliko puta godišnje.<br/>
                        Ta je pojava češća u osoba s blago povišenim krvnim tlakom. Kod tih osoba je darivanje krvi ujedno<br/>
                        i način ublažavanja simptoma uzrokovanih blagim povišenjem krvnog tlaka, ali nije način liječenja<br/>
                         povišenog tlaka.</p>

                    </div>
                    :null}

                </div>
                <div className="desni">
                <br/>

                <label  className="naslov" >Za više detalja o darivanju krvi posjetite <a href="https://www.ztmfbih.ba/">ZZTMFBIH</a>.</label>
                        <br/>
                        <br/>
                    <label className="naslov">Prijavite se na sistem za donaciju krvi.</label>
                    
                    <button className="Login"> <Link className="openLogin" to="/login">Login</Link></button>
                    <br></br>
                    
                </div>
                </div>
            </div>
        )
    }
}
export default HomePageComponent