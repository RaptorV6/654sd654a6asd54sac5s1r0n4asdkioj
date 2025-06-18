- [x] Ciselnik `Stanic`

# Definice `Stanice`

`Stanice` je definovana vlastnostmi:

- `id`
- `code`
- `name`
- `description`

- [x] Ciselnik `Zamestnancu`
- [x] Ciselnik `Kompetencnich roli`
- [x] Ciselnik prirazeni `Kompetencnich roli` k `Zamestnanci` => `Resource`

- [x] Ciselnik `Segmentu sluzeb`
- [x] Ciselnik `Urovni sluzeb`
- [x] Ciselnik `Sluzeb`
- [x] Ciselnik behu programu per `Stanice`

- [ ] `Stanice` ma barevnou strukturu pro `Segmenty sluzeb`
- [ ] `Stanice` A muze mit zarazenou `Sluzbu` v jinem `Segmentu` nez `Stanice` B
- [ ] `Stanice` ma specificke deleni `Pacientu` do `Skupin pacientu`
- [ ] `Stanice` ma specificke deleni `Lecebneho programu` do `Behu programu` -
      lichy sudy tyden
- [ ] `Ciselnik tydnu` per `Stanice`, ktery definuje `Beh programu` pro dany
      tyden
- [ ] Potrebujeme identifikovat svatky

# User stories

- [ ] `Mistnost` je potrebne namapovat na **AMOS**
- [ ] Je potrebne zjistit z **AMOS** obsazeni mistnosti
- [ ] Zobrazeni pohledu transponovane (minimalne pro PDF)
- [ ] _Planujici_ je schopen vytisknout PDF pro dany tyden `Stanice` A
- [ ] _Planujici_ otevre prehled mesice a pokud prehled neobsahuje zadne zaznamy
      muze vygenerovat `Program` z template. Zobrazi se mu tlacitko pro
      dogenerovani `Programu`.
- [ ] `Program` pri generovani zjisti jestli je definovany `Beh programu` pro
      vsechny tydny
- [ ] **Aplikace** zobrazi prehlad programu pro zadani do **AMOS**.
- [ ] _Planujici_ ma moznost z vygenerovaneho `Programu` odebrat naplanovanou
      `Sluzbu`
- [ ]
