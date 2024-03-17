import { useEffect, useState } from "react"
import Ulke from "./Ulke"

function UlkeListe() {
    const [hata, hataGuncelle] = useState(null) //hata mesajı
    const [yukleniyor, yukleniyorGuncelle] = useState(true) //verilerin yüklenme durumu
    const [ulkeler, ulkeleriGuncelle] = useState([]) // asıl verilerimiz bu arrayde olacak

    // arama işlemleri için
    const [arama, aramaGuncelle] = useState("")
    const [aramaAlanlari] = useState(["capital", "name"]);
  
    useEffect( ()=>{
        async function veriCek()  {
            try {
                const yanit = await fetch("https://restcountries.com/v3.1/all")
                const JSObjesi = await yanit.json()
    
                ulkeleriGuncelle(JSObjesi)
                yukleniyorGuncelle(false)
            } catch(hata) {
                hataGuncelle(hata.message)
            }

        }

        setTimeout( veriCek, 2000 ) // @TODO gerçek appte veriCek() doğrudan çalıştırılacak
    } , [] )
  
    function filtrele(ulkeler) {
        
        return ulkeler.filter((item) => {
            const aranan = arama.toLowerCase()
            
            if( item.name?.common.toLowerCase().includes(aranan) )
                return true

            if( item.name?.official.toLowerCase().includes(aranan) )
                return true

            const ulkeKisaltma = item.name?.cca3
            if( item.name?.nativeName[].official.toLowerCase().includes(aranan) )
            return true

            if( item.name?.official.toLowerCase().includes(aranan) )
                return true

            return item.capital?.some( baskent=> baskent.toLowerCase().includes(aranan) ) 
            
        });
    }


    if(hata) {
      return (
        <>
            <div className="alert alert-danger">
                {hata}
            </div>
        </>
      )
    }
  
    if(yukleniyor) {
      return (
        <>Yükleniyor..</>
      )
    }
  
    return (
      <>
        <h2>ÜLKE LİSTESİ</h2>
        <div className="mb-4">
            <input value={arama} onChange={ (e)=>{ aramaGuncelle(e.target.value) } } className="form-control" type="text" placeholder="Arama ifadesi.." />
        </div>

        <div className="row g-3">
            { console.log(ulkeler) }

            {filtrele(ulkeler).map( (ulke)=> <Ulke key={ulke.ccn3} ulkeVeri={ulke} /> )}
        </div>
      </>
    );

}

export default UlkeListe