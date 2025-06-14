import random
class Noppa:
    
    def __init__(self, sivut=6):
        self.__sivut = sivut 
        
    def heita_noppaa(self, heittoMaara):
        tulokset = []
        for i in range(heittoMaara):
            tulokset.append(random.randint(1, self.__sivut)) 
        return tulokset   
    
    def __str__(self):
        return f"{self.__sivut}-sivuinen noppa"
    


class Noppapeli:
    
    def __init__(self, Noppa):
        self.__noppa = Noppa
        self.yksi_kierros = 5
        
    def heita_kerran(self):
        tulokset = []
        tulokset = self.__noppa.heita_noppaa(self.yksi_kierros)
        tulokset.sort()
        kaikki_samat = True
        for x in tulokset:
            if x != tulokset[0]:
                kaikki_samat = False
                break
        if kaikki_samat:
            print("Yatzy!")
            return
        
        
        print(f"Heitettiin {self.yksi_kierros} noppaa ja saatiin {', '.join(str(x) for x in tulokset)}.")
        return tulokset

    def heita_viisi_samaa(self):
        kierrosten_maara = 0
        while True:
            kierrosten_maara += 1
            tulokset = self.__noppa.heita_noppaa(self.yksi_kierros)
            kaikki_samat = True
            for x in tulokset:
                if x != tulokset[0]:
                    kaikki_samat = False
                    break
            if kaikki_samat:
                break
        print(f"Meni {kierrosten_maara} heittoa saada viisi samaa.")
        return kierrosten_maara
    
    def __str__(self):
        return f"Pelin tarkoitus on saada noppia heittämällä 5 samaa lukua. Käytössä on {self.__noppa._Noppa__sivut}-sivuinen noppa."
   
def noppa_test():
    kuusi_sivuinen_noppa = Noppa()
    kahdeksan_sivuinen_noppa = Noppa(8)

    print(kuusi_sivuinen_noppa)
    print(kahdeksan_sivuinen_noppa)

    nopan_heitto = kuusi_sivuinen_noppa.heita_noppaa(5)
    print(nopan_heitto)

    toisen_nopan_heitto = kahdeksan_sivuinen_noppa.heita_noppaa(2)
    print(toisen_nopan_heitto)



def noppa_peli_test():
    kuusi_sivuinen_noppa = Noppa()
    peli = Noppapeli(kuusi_sivuinen_noppa)

    print(peli)

    peli.heita_kerran()
    peli.heita_kerran()
    peli.heita_kerran()
    peli.heita_kerran()

    peli.heita_viisi_samaa()

    vaikea_peli = Noppapeli(Noppa(10))
    vaikea_peli.heita_viisi_samaa()

    helppo_peli = Noppapeli(Noppa(1))
    helppo_peli.heita_kerran()
    helppo_peli.heita_kerran()
    helppo_peli.heita_kerran()
    helppo_peli.heita_kerran() 


noppa_test()
noppa_peli_test()