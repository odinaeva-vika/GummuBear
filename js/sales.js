/*timer*/
document.addEventListener("DOMContentLoaded", () => {
  const deadline = new Date();
  deadline.setHours(deadline.getHours() + 6);

  let timerId;

  function countdownTimer() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      clearInterval(timerId);
    }

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) : 0;
    const minutes = diff > 0 ? Math.floor((diff / 1000 / 60) % 60) : 0;
    const seconds = diff > 0 ? Math.floor((diff / 1000) % 60) : 0;

    $hours.textContent = formatNumber(hours);
    $minutes.textContent = formatNumber(minutes);
    $seconds.textContent = formatNumber(seconds);
  }

  const $hours = document.querySelector(".js-timer__hours");
  const $minutes = document.querySelector(".js-timer__minutes");
  const $seconds = document.querySelector(".js-timer__seconds");

  countdownTimer();
  timerId = setInterval(countdownTimer, 1000);
});

/*custom-dropdown*/
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".js-custom-dropdown");
  const dropdownList = document.querySelector(".js-dropdown-list");
  const selectedItem = document.querySelector(".js-selected-item");

  const initiallySelected = dropdownList.querySelector("li[selected]");
  if (initiallySelected) {
    selectItem(initiallySelected);
  }

  dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  dropdownList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      selectItem(event.target);
      dropdown.classList.remove("active");
      event.stopPropagation(); // Предотвратить всплытие события
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !dropdown.contains(event.target) &&
      dropdown.classList.contains("active")
    ) {
      dropdown.classList.remove("active");
    }
  });

  function selectItem(item) {
    const selectedValue = item.getAttribute("data-value");
    selectedItem.textContent = item.textContent;

    const selectedElement = dropdownList.querySelector("li[selected]");
    if (selectedElement) {
      selectedElement.removeAttribute("selected");
      selectedElement.classList.remove("js-dropdown__font_weight");
    }

    item.setAttribute("selected", "true");
    item.classList.add("js-dropdown__font_weight");
  }
});

/*result*/
document.addEventListener("DOMContentLoaded", () => {
  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : null;
  }

  const textBlock2 = document.getElementById("result-2");
  const textBlock3 = document.getElementById("result-3");
  const textBlock4 = document.getElementById("result-4");

  const selectedValuesAge = getCookie("userAge");
  const selectedValuesHeight = getCookie("userHeight");
  const selectedValuesWeight = getCookie("userWeight");
  const userDiabetes = JSON.parse(getCookie("userDiabetes"));
  const userCardiovascular = JSON.parse(getCookie("userCardiovascular"));

  const calculateResultBlock2 = () => {
    const calculatedValue = selectedValuesHeight - 10 - 100;
    let result = "";

    if (selectedValuesAge >= 18 && selectedValuesAge <= 29) {
      result =
        selectedValuesWeight >= calculatedValue
          ? `<span>${selectedValuesAge}</span> hai ancora un metabolismo abbastanza veloce, ma con un peso di <span>${selectedValuesWeight}</span> hai già problemi di obesità, dai quali è urgente liberarsi per essere una persona sana e felice!`
          : `A <span>${selectedValuesAge}</span> hai ancora un metabolismo abbastanza veloce, e il tuo peso di <span>${selectedValuesWeight}</span> è nella norma. Tuttavia, è facile perdere questa norma in futuro se non fai nulla per mantenere un metabolismo normale! Un metabolismo normale è importante non solo per un corpo snello, ma anche per una buona digestione, aiutando ad assorbire tutti i nutrienti dai cibi, il che è una garanzia per una buona salute.`;
    } else if (selectedValuesAge >= 30 && selectedValuesAge <= 39) {
      result =
        selectedValuesWeight >= calculatedValue
          ? `A <span>${selectedValuesAge}</span> il tuo metabolismo inizia a rallentare, e il tuo peso di <span>${selectedValuesWeight}</span> ne è una prova diretta. Purtroppo, sei in sovrappeso, il che è una situazione che devi affrontare urgentemente per essere una persona sana e felice!`
          : `A <span>${selectedValuesAge}</span> il tuo metabolismo inizia a rallentare, ma il tuo peso di <span>${selectedValuesWeight}</span> è ancora nella norma. Tuttavia, è facile perdere questa normalità in futuro se non fai nulla per mantenere un metabolismo sano! Un corretto funzionamento del metabolismo è importante non solo per avere un corpo snello, ma anche per una buona digestione, aiutando a assorbire tutti i nutrienti dai cibi, il che è fondamentale per una salute robusta.`;
    } else if (selectedValuesAge >= 40 && selectedValuesAge <= 55) {
      result =
        selectedValuesWeight >= calculatedValue
          ? `A <span>${selectedValuesAge}</span> il normale funzionamento del tuo metabolismo sta giungendo al termine, e il tuo peso di <span>${selectedValuesWeight}</span> ne è una prova diretta. Purtroppo, sei in sovrappeso e è necessario agire immediatamente per raggiungere uno stato di salute e felicità!`
          : `A <span>${selectedValuesAge}</span> il normale funzionamento del tuo metabolismo sta giungendo al termine, ma il tuo peso di <span>${selectedValuesWeight}</span> è ancora nella norma. Tuttavia, è facile uscire dalla norma in futuro se non si prendono misure per mantenere un metabolismo sano! Un metabolismo sano è importante non solo per mantenere un peso corporeo ideale, ma anche per una buona digestione e per l'assorbimento di tutti i nutrienti dai cibi, il che è fondamentale per una salute robusta.`;
    } else if (selectedValuesAge >= 56) {
      result =
        selectedValuesWeight >= calculatedValue
          ? `A <span>${selectedValuesAge}</span> il tuo metabolismo è praticamente inattivo, e il tuo peso di <span>${selectedValuesWeight}</span> è una chiara testimonianza di ciò. Purtroppo, soffri di obesità, da cui è urgente liberarsi per godere di buona salute e felicità!`
          : `A <span>${selectedValuesAge}</span> il tuo metabolismo è praticamente inattivo, ma il tuo peso di <span>${selectedValuesWeight}</span> è nella norma, ed è meraviglioso! Tuttavia, questa norma può essere facilmente persa in futuro se non si fa nulla per mantenere un metabolismo normale. Il corretto funzionamento del metabolismo è importante non solo per avere un corpo snodato, ma anche per una buona digestione, aiutando ad assorbire tutti i nutrienti dai cibi, il che è garanzia di buona salute.`;
    }

    textBlock2.innerHTML = result;
  };

  const calculateResultBlock3 = () => {
    const isDiabetes = userDiabetes == "Si";
    const isCardiovascular = userCardiovascular == "Si";
    const calculatedValue = selectedValuesHeight - 10 - 100;

    let result = "";

    if (
      selectedValuesWeight >= calculatedValue &&
      !isDiabetes &&
      !isCardiovascular
    ) {
      result = `
      <h2 class="dangerous__title">
        Quali sono i pericoli del tuo peso?
      </h2>
      <div class="dangerous__wrapper">
        <div class="dangerous__boxes">
          <div class="dangerous__box">
            <h3 class="dangerous__box-title">
              Malattie cardiovascolari:
            </h3>
            <p class="dangerous__box-text">
              L'obesità è uno dei principali fattori di rischio nello sviluppo di malattie cardiovascolari come l'ipertensione arteriosa (pressione alta), l'infarto miocardico (attacco di cuore), la malattia ischemica del cuore e altre.
            </p>
          </div>
          <div class="dangerous__box">
            <h3 class="dangerous__box-title">
              Diabete di tipo 2:
            </h3>
            <p class="dangerous__box-text">
              L'obesità aumenta in modo significativo il rischio di sviluppare il diabete di tipo 2, che può avere gravi conseguenze sulla salute, tra cui problemi con i vasi sanguigni, i reni, il sistema nervoso e altri organi.
            </p>
          </div>
          <div class="dangerous__box">
            <h3 class="dangerous__box-title">
              Malattie epatiche:
            </h3>
            <p class="dangerous__box-text">
              L'obesità può portare alla steatosi epatica, compreso il fegato grasso non alcolico (NASH), che può portare alla cirrosi epatica e ad altre gravi malattie epatiche.
            </p>
          </div>
          <div class="dangerous__box">
            <h3 class="dangerous__box-title">
              Problemi respiratori:
            </h3>
            <p class="dangerous__box-text">
              L'obesità può aumentare il rischio di apnea notturna e ridurre la qualità del sonno. Ciò può portare a stanchezza cronica, ridotta concentrazione e altri problemi di salute.
            </p>
          </div>
          <div class="dangerous__box">
            <h3 class="dangerous__box-title">
              Problemi muscolo-scheletrici:
            </h3>
            <p class="dangerous__box-text">
              Il sovrappeso mette pressione sulle articolazioni e può portare a dolori alla schiena, artrite e altri problemi del sistema muscolo-scheletrico.
            </p>
          </div>
          </div>
          <div class="dangerous__boxes">
          <div class="dangerous__box">
            <h3 class="dangerous__box-title">
              Cancro:
            </h3>
            <p class="dangerous__box-text">
              L'obesità può aumentare il rischio di sviluppare diversi tipi di cancro, tra cui il cancro al seno, il cancro alle ovaie, il cancro al pancreas e altri.
            </p>
          </div>
          <div class="dangerous__box">
            <h3 class="dangerous__box-title">
              Problemi psicologici:
            </h3>
            <p class="dangerous__box-text">
              L'obesità può causare depressione, ansia, isolamento sociale e una percezione negativa del proprio corpo.
            </p>
          </div>
          <div class="dangerous__box">
            <h3 class="dangerous__box-title">
              Problemi di salute riproduttiva:
            </h3>
            <p class="dangerous__box-text">
              Nelle donne, l'obesità può causare problemi con il ciclo mestruale, l'infertilità e complicazioni durante la gravidanza.
            </p>
          </div>
          <div class="dangerous__box">
            <h3 class="dangerous__box-title">
              Aumento del rischio di mortalità:
            </h3>
            <p class="dangerous__box-text">
              L'obesità è associata a un aumento del rischio di morte prematura a causa di complicazioni legate a questa condizione.
            </p>
          </div>
          <div class="dangerous__box">
            <h3 class="dangerous__box-title">
              Aumento del rischio di mortalità:
            </h3>
            <p class="dangerous__box-text">
              L'obesità è associata a un aumento del rischio di morte prematura a causa di complicazioni legate a questa condizione.
            </p>
          </div>
        </div>
      </div>
      <div class="dangerous__container">
        <p class="dangerous__container-text">
          Come puoi vedere, ci sono abbastanza motivi per prendere sul
          serio il problema dell'obesità e cercare di risolverlo.
        </p>
        <p class="dangerous__container-description">
          Ma hai fortuna, GummyBear Fit può affrontare facilmente questa
          sfida!
        </p>
      </div>`;
    } else if (
      selectedValuesWeight < calculatedValue &&
      !isDiabetes &&
      !isCardiovascular
    ) {
      result = `<h2 class="dangerous__title">
          Sostieni il tuo stile di vita con GummyBear Fit!
        </h2>
        <p class="dangerous__title-text">Anche se sei già sulla strada giusta verso uno stile di vita sano, GummyBear Fit può diventare il tuo alleato ideale per mantenere l'attività e sentirsi energico.</p>
        <div class="dangerous__wrapper">
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Combustione dei grassi:
              </h3>
              <p class="dangerous__box-text">
                I nostri deliziosi orsetti contribuiscono alla combustione dei grassi in eccesso anche per coloro che non combattono l'obesità. Ciò significa che puoi mantenere la tua forma e il tuo peso desiderato.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Accelerazione del metabolismo:
              </h3>
              <p class="dangerous__box-text">
                GummyBear Fit aiuterà il tuo corpo a funzionare in modo più efficiente, aumentando i livelli di energia e permettendoti di goderti appieno ogni giorno.
              </p>
            </div>
          </div>
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Riduzione dell'appetito:
              </h3>
              <p class="dangerous__box-text">
                Sarà più facile fare scelte alimentari corrette, poiché i nostri orsetti aiuteranno a ridurre il desiderio di consumare carboidrati e dolci in eccesso.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Energia per l'intera giornata:
              </h3>
              <p class="dangerous__box-text">
                Niente cali di energia durante il giorno! GummyBear Fit si prenderà cura della tua produttività e del tuo umore per l'intera giornata.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Miglioramento della digestione:
              </h3>
              <p class="dangerous__box-text">
                Prenditi cura del tuo stomaco e dell'intestino. Questo prodotto aiuta a migliorare i processi digestivi e l'assorbimento delle sostanze nutritive.
              </p>
            </div>
          </div>
        </div>
        <div class="dangerous__container">
          <p class="dangerous__container-text">
            GummyBear Fit non è solo un integratore, è il tuo affidabile compagno nel percorso verso una vita ancora più sana e attiva.
          </p>
          <p class="dangerous__container-description">
            Includilo nella tua dieta e sentirai la differenza!
          </p>
        </div>
        `;
    } else if (
      selectedValuesWeight >= calculatedValue &&
      isDiabetes &&
      !isCardiovascular
    ) {
      result = `<h2 class="dangerous__title">
          Quali sono i pericoli del tuo peso con il diabete?
        </h2>
        <p class="dangerous__title-text">L'obesità nel diabete, soprattutto nel diabete di tipo 2, rappresenta una condizione particolarmente grave che aumenta il rischio di complicazioni e peggiora il controllo del diabete. Ecco alcune delle principali pericolo dell'obesità nel diabete:</p>
        <div class="dangerous__wrapper">
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Peggioramento dell'insulino-resistenza:
              </h3>
              <p class="dangerous__box-text">
                L'obesità contribuisce allo sviluppo dell'insulino-resistenza, in cui le cellule del corpo diventano meno sensibili all'azione dell'insulina. Ciò rende più difficile il passaggio del glucosio dal sangue alle cellule, aumentando il livello di zucchero nel sangue.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Aumento del rischio di complicazioni cardiovascolari:
              </h3>
              <p class="dangerous__box-text">
                L'obesità e l'alto livello di zucchero nel sangue aumentano il rischio di sviluppare malattie cardiovascolari come l'aterosclerosi (accumulo di colesterolo nelle arterie), l'angina, l'infarto miocardico e l'ictus.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Aumento della pressione arteriosa:
              </h3>
              <p class="dangerous__box-text">
                L'obesità spesso è associata all'ipertensione arteriosa (pressione alta), che aumenta i rischi per il sistema cardiovascolare e i reni.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Problemi epatici:
              </h3>
              <p class="dangerous__box-text">
                L'obesità può causare steatosi epatica, inclusa la steatoepatite non alcolica (NASH), che può portare alla cirrosi epatica e ad altre malattie del fegato.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Complicazioni renali:
              </h3>
              <p class="dangerous__box-text">
                L'alto livello di zucchero nel sangue e l'ipertensione associati all'obesità possono danneggiare le funzioni renali, causando la nefropatia diabetica.
              </p>
            </div>
          </div>
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Problemi alla vista:
              </h3>
              <p class="dangerous__box-text">
                La retinopatia diabetica, una complicanza che può portare a una diminuzione della vista e persino alla cecità, spesso è aggravata dall'obesità.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Complicazioni neurologiche: 
              </h3>
              <p class="dangerous__box-text">
                L'obesità può intensificare la neuropatia (danno ai nervi), che porta a dolori, formicolio e altre sensazioni sgradevoli.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Peggioramento della qualità di vita complessiva: 
              </h3>
              <p class="dangerous__box-text">
                 L'obesità può portare a problemi fisici e psicologici, tra cui riduzione della mobilità, depressione e isolamento sociale.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Aumento del rischio di mortalità: 
              </h3>
              <p class="dangerous__box-text">
                 L'obesità aumenta il rischio di morte prematura per diverse ragioni, tra cui le complicazioni sopra menzionate.
              </p>
            </div>
          </div>
        </div>
        <div class="dangerous__container">
          <p class="dangerous__container-text">
            Come puoi vedere, ci sono abbastanza motivi per prendere seriamente il problema dell'obesità e risolverlo.
          </p>
          <p class="dangerous__container-description">
            Ma sei fortunato, GummyBear Fit può gestire facilmente questa sfida, e il nostro prodotto non ha controindicazioni per il diabete di tipo 1 e tipo 2!
          </p>
        </div>`;
    } else if (
      selectedValuesWeight < calculatedValue &&
      isDiabetes &&
      !isCardiovascular
    ) {
      result = `<h2 class="dangerous__title">
          Prenditi cura della tua salute insieme a noi!
        </h2>
        <p class="dangerous__title-text">Stai monitorando il tuo peso, ma hai affrontato il diabete? GummyBear Fit può diventare il tuo affidabile alleato nel cammino verso una migliore salute.</p>
        <div class="dangerous__wrapper">
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Combustione dei grassi:
              </h3>
              <p class="dangerous__box-text">
                Il nostro prodotto aiuta ad attivare il processo di combustione dei grassi, migliorando la sensibilità all'insulina e mantenendo stabili i livelli di zucchero nel sangue.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Accelerazione del metabolismo:
              </h3>
              <p class="dangerous__box-text">
                Con GummyBear Fit il tuo organismo lavorerà in modo più efficiente, aiutando a bilanciare i livelli di glucosio e insulina.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Riduzione dell'appetito:
              </h3>
              <p class="dangerous__box-text">
                Gestire la sensazione di fame può essere complicato con il diabete. I nostri deliziosi orsetti ti aiuteranno a controllare meglio l'appetito e renderanno l'alimentazione sana più accessibile.
              </p>
            </div>
          </div>
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Energia per l'intera giornata:
              </h3>
              <p class="dangerous__box-text">
                Dimenticate i picchi di zucchero nel sangue e la stanchezza. GummyBear Fit vi fornirà energia per l'intera giornata, aiutandovi a mantenere uno stile di vita attivo.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Miglioramento della digestione:
              </h3>
              <p class="dangerous__box-text">
                Il diabete può influenzare il sistema digestivo. I nostri orsetti aiuteranno a migliorare i processi di digestione e l'assorbimento dei nutrienti.
              </p>
            </div>
          </div>
        </div>
        <div class="dangerous__container">
          <p class="dangerous__container-text">
            GummyBear Fit è il tuo passo verso un miglior controllo del diabete e un miglioramento generale della salute.
          </p>
          <p class="dangerous__container-description">
            Prendiamoci cura insieme del tuo benessere e della qualità della vita!
          </p>
        </div>`;
    } else if (
      selectedValuesWeight >= calculatedValue &&
      !isDiabetes &&
      isCardiovascular
    ) {
      result = `<h2 class="dangerous__title">
          Uali sono i pericoli del tuo peso nelle malattie cardiovascolari?
        </h2>
        <p class="dangerous__title-text">L'obesità nelle malattie cardiovascolari rappresenta una particolare minaccia poiché aumenta il rischio di sviluppare e peggiorare tali malattie. Ecco alcune delle principali pericolo dell'obesità nelle malattie cardiovascolari:</p>
        <div class="dangerous__wrapper">
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Aterosclerosi e malattia coronarica:
              </h3>
              <p class="dangerous__box-text">
                L'obesità è uno dei principali fattori di rischio nello sviluppo dell'aterosclerosi (accumulo di colesterolo nelle arterie), che può portare all'angina (dolore toracico) e all'infarto miocardico (attacco cardiaco). L'obesità aumenta il carico sul cuore e può comportare un carico aggiuntivo su di esso.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Ipertensione (pressione arteriosa alta):
              </h3>
              <p class="dangerous__box-text">
                 L'obesità è associata all'aumento della pressione arteriosa, aumentando il rischio di sviluppare ipertensione arteriosa. L'aumento della pressione sanguigna aumenta il carico sul cuore e sui vasi sanguigni, il che può portare a diverse complicazioni cardiovascolari.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Insufficienza cardiaca:
              </h3>
              <p class="dangerous__box-text">
               L'obesità può aumentare il rischio di sviluppare insufficienza cardiaca, in cui il cuore non è in grado di pompare il sangue in modo sufficientemente efficiente. Ciò porta a edema, dispnea e limitazioni nell'attività fisica.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Ictus:
              </h3>
              <p class="dangerous__box-text">
               Il sovrappeso è un fattore di rischio per l'ictus, che può avere conseguenze devastanti per il cervello e il sistema nervoso.
              </p>
            </div>
          </div>
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Diabete mellito:
              </h3>
              <p class="dangerous__box-text">
                L'obesità aumenta significativamente il rischio di sviluppare il diabete di tipo 2, che a sua volta aumenta i rischi di complicanze cardiovascolari.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Dislipidemia:
              </h3>
              <p class="dangerous__box-text">
                L'obesità può causare alterazioni del profilo lipidico (livelli di colesterolo e trigliceridi nel sangue), che contribuiscono anche all'aterosclerosi e alle malattie cardiovascolari.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Disordini del ritmo cardiaco:
              </h3>
              <p class="dangerous__box-text">
                L'obesità può aumentare la probabilità di aritmie (ritmi cardiaci irregolari), compresa la fibrillazione atriale, aumentando il rischio di ictus e altre complicanze.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Aumento del rischio di morte:
              </h3>
              <p class="dangerous__box-text">
                Le persone con obesità e malattie cardiovascolari hanno un rischio più elevato di morte prematura a causa di complicanze cardiache.

              </p>
            </div>
          </div>
        </div>
        <div class="dangerous__container">
          <p class="dangerous__container-text">
            Come puoi vedere, ci sono abbastanza motivi per affrontare seriamente il problema dell'obesità e risolverlo.
          </p>
          <p class="dangerous__container-description">
            Ma sei fortunato, GummyBear Fit può affrontare facilmente questa sfida, e il nostro prodotto non ha controindicazioni per le malattie cardiovascolari!
          </p>
        </div>`;
    } else if (
      selectedValuesWeight < calculatedValue &&
      !isDiabetes &&
      isCardiovascular
    ) {
      result = `<h2 class="dangerous__title">
          Prenditi cura della tua salute con noi!
        </h2>
        <p class="dangerous__title-text">Il tuo peso è nella norma, ma soffri di malattie cardiovascolari? Allora GummyBear Fit è il tuo affidabile alleato per mantenere la salute del tuo sistema cardiovascolare.</p>
        <div class="dangerous__wrapper">
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Bruciare i grassi:
              </h3>
              <p class="dangerous__box-text">
                Il nostro prodotto favorisce una efficace combustione dei grassi in eccesso, anche se il tuo peso è nella norma. Ciò aiuta a ridurre lo stress sul cuore e sui vasi sanguigni.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Accelerazione del metabolismo:
              </h3>
              <p class="dangerous__box-text">
                 GummyBear Fit aiuta il tuo corpo a funzionare in modo più efficiente, favorendo un miglior metabolismo e mantenendo la salute dei vasi sanguigni.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Riduzione dell'appetito:
              </h3>
              <p class="dangerous__box-text">
               Un'appetito bilanciato è la chiave per una dieta sana. I nostri deliziosi orsetti ti aiuteranno a controllare il consumo di cibo e a optare per opzioni più salutari.
              </p>
            </div>
          </div>
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Energia per tutta la giornata:
              </h3>
              <p class="dangerous__box-text">
                Il benessere e l'attività sono aspetti importanti per prendersi cura del cuore. GummyBear Fit vi dà energia, aiutandovi a mantenere uno stile di vita attivo, senza l'uso di caffeina.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Miglioramento della digestione:
              </h3>
              <p class="dangerous__box-text">
                Una buona digestione è fondamentale per il benessere generale. I nostri orsetti vi aiuteranno a migliorare i processi digestivi e l'assorbimento di sostanze nutritive utili.</p>
            </div>
          </div>
        </div>
        <div class="dangerous__container">
          <p class="dangerous__container-text">
            GummyBear Fit non è solo un integratore. È la vostra opportunità di fare ancora di più per prendervi cura del vostro cuore, anche se siete già in forma.
          </p>
          <p class="dangerous__container-description">
            Affidatevi al gusto e ai benefici in un'unica bottiglia!
          </p>
        </div>`;
    } else if (
      selectedValuesWeight >= calculatedValue &&
      isDiabetes &&
      isCardiovascular
    ) {
      result = `<h2 class="dangerous__title">
          Quali sono i rischi del vostro peso con il diabete e le malattie cardiovascolari?
        </h2>
        <p class="dangerous__title-text">L'obesità in presenza di malattie cardiovascolari e diabete (in particolare il diabete di tipo 2) è una condizione particolarmente pericolosa, poiché aumenta il rischio di complicanze e peggiora il controllo di queste malattie. Ecco quali pericoli possono sorgere con la combinazione di obesità, malattie cardiovascolari e diabete:</p>
        <div class="dangerous__wrapper">
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Aumento dell'aterosclerosi:
              </h3>
              <p class="dangerous__box-text">
                L'obesità contribuisce allo sviluppo dell'aterosclerosi, che può portare a arterie strette e ostruite. Questo peggiora l'apporto di sangue agli organi e ai tessuti, rappresentando un pericolo sia per il sistema cardiovascolare che per altri organi.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Aumento del rischio di infarto miocardico:
              </h3>
              <p class="dangerous__box-text">
                 L'obesità e il diabete aumentano la probabilità di sviluppare un infarto miocardico (attacco di cuore). L'alto livello di zucchero nel sangue nel diabete e le anomalie nelle arterie nell'obesità creano una combinazione pericolosa.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Rischio di ictus:
              </h3>
              <p class="dangerous__box-text">
               La combinazione di obesità e diabete aumenta anche il rischio di ictus, che può portare a gravi compromissioni delle funzioni cerebrali.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Ipertensione arteriosa:
              </h3>
              <p class="dangerous__box-text">
               L'obesità e il diabete spesso si associano all'ipertensione arteriosa, peggiorando le condizioni dei vasi sanguigni e del cuore.
              </p>
            </div>
          </div>
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Dislipidemia:
              </h3>
              <p class="dangerous__box-text">
                L'obesità può causare disturbi nel profilo lipidico (livelli di colesterolo e trigliceridi), aumentando così il rischio di complicazioni cardiovascolari e diabete.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Diabete mellito:
              </h3>
              <p class="dangerous__box-text">
                 L'obesità è uno dei principali fattori di rischio per il diabete di tipo 2. Le persone con diabete e obesità hanno più difficoltà a controllare i livelli di zucchero nel sangue.</p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Insufficienza cardiaca:
              </h3>
              <p class="dangerous__box-text">
                 L'obesità aumenta il rischio di sviluppare un'insufficienza cardiaca, compromettendo il funzionamento del cuore.</p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Aumento del rischio di mortalità:
              </h3>
              <p class="dangerous__box-text">
                  I pazienti con combinazione di obesità, malattie cardiovascolari e diabete hanno un rischio più elevato di morte prematura.</p>
            </div>
          </div>
        </div>
        <div class="dangerous__container">
          <p class="dangerous__container-text">
            Come puoi vedere, c'è abbastanza motivo per prendere sul serio il problema dell'obesità e affrontarlo con decisione.
          </p>
          <p class="dangerous__container-description">
            Ma hai fortuna, GummyBear Fit può gestire facilmente questa sfida. Il nostro prodotto non ha controindicazioni per il diabete di tipo 1-2 e le malattie cardiovascolari!
          </p>
        </div>`;
    } else if (
      selectedValuesWeight < calculatedValue &&
      isDiabetes &&
      isCardiovascular
    ) {
      result = `<h2 class="dangerous__title">
          Prenditi cura della tua salute insieme a noi!
        </h2>
        <p class="dangerous__title-text">Per te, la cura della salute non è solo una scelta, ma uno stile di vita. E GummyBear Fit è appositamente progettato per coloro che si prendono cura del proprio cuore e desiderano controllare efficacemente il diabete, mantenendo una buona forma fisica.</p>
        <div class="dangerous__wrapper">
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Combustione dei grassi: 
              </h3>
              <p class="dangerous__box-text">
                Il nostro prodotto ti aiuterà ancora di più a mantenere un peso corporeo sano, il che è particolarmente importante in caso di diabete e malattie cardiovascolari. La riduzione del grasso in eccesso contribuisce a migliorare il controllo del glucosio nel sangue e a ridurre il carico sul cuore.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Accelerazione del metabolismo:
              </h3>
              <p class="dangerous__box-text">
                 GummyBear Fit supporta un efficace funzionamento del tuo corpo, aiutando a mantenere stabili i livelli di zucchero nel sangue e a ridurre i rischi per il sistema cardiovascolare.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Diminuzione dell'appetito:
              </h3>
              <p class="dangerous__box-text">
               Gestire l'appetito in caso di diabete e malattie cardiovascolari è fondamentale. I nostri deliziosi orsetti ti aiuteranno a controllare l'assunzione di cibo, contribuendo a mantenere una dieta sana.
              </p>
            </div>
          </div>
          <div class="dangerous__boxes">
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Energia per l'intera giornata:
              </h3>
              <p class="dangerous__box-text">
                Niente picchi di zucchero e affaticamento. GummyBear Fit ti fornisce energia per tutta la giornata, sostenendo uno stile di vita attivo.
              </p>
            </div>
            <div class="dangerous__box">
              <h3 class="dangerous__box-title">
                Miglioramento della digestione:
              </h3>
              <p class="dangerous__box-text">
                 Prenditi cura della salute del tuo stomaco e dell'intestino. I nostri orsetti aiutano a migliorare i processi digestivi e l'assorbimento di sostanze nutrienti.</p>
            </div>
          </div>
        </div>
        <div class="dangerous__container">
          <p class="dangerous__container-text">
            GummyBear Fit è il tuo percorso verso una migliore salute del cuore e un controllo più efficace del diabete.
          </p>
          <p class="dangerous__container-description">
            Concediti il piacere di migliorare il tuo benessere con ogni delizioso orsetto!
          </p>
        </div>`;
    }

    textBlock3.innerHTML = result;
  };

  const calculateResultBlock4 = () => {
    if (!isNaN(selectedValuesWeight) && !isNaN(selectedValuesHeight)) {
      const calculatedValue = selectedValuesHeight - 10 - 100;

      let result = "";

      if (selectedValuesWeight >= calculatedValue) {
        result = `
      <div class="change__boxes">
        <div class="change__box-img change__boxes-item1"></div>
        <h2 class="change__title change__boxes-item2">
          Не temete il cambiamento, agite ora!
        </h2>
        <p class="change__text change__boxes-item3">
          Sappiamo quanto sia importante per voi raggiungere il peso
          desiderato, e GummyBear Fit è la chiave per questo sogno!
          Immaginate il vostro corpo trasformarsi, la vostra salute
          diventare più forte e raggiungere il peso che avete sempre
          sognato.
        </p>
        <p class="change__text change__text_bold change__boxes-item4">
          Facciamo diventare realtà il vostro sogno del peso ideale!
          GummyBear Fit è il vostro fedele compagno sulla strada verso
          un "io" migliore e più sano. Fidatevi del nostro prodotto e
          sentirete la differenza.
        </p>
        <p class="change__text change__boxes-item5">
          Per raggiungere un peso di <span>${selectedValuesWeight}</span>, basta
          prendere solo 2 guumie dopo colazione e cena! È così
          semplice, vero? Per ordinare GummyBear Fit, compilate il
          modulo di consegna qui sotto.
        </p>
      </div>
      <div class="change__container">
        <img class="change__container-item1" src="./img/vector-change-1.svg" alt="present" />
        <h4 class="change__container-title change__container-item2">Ma non è tutto!</h4>
        <p class="change__container-text change__container-item3">
          Al momento abbiamo una speciale promozione 2x1: ordinando una
          confezione di GummyBear Fit, ne ricevete un'altra in regalo.
          Affrettatevi, l'offerta sta per scadere!
        </p>
        <p class="change__container-description change__container-item4">
          Non perdete l'occasione di iniziare un nuovo capitolo nella
          vostra vita. Ordinate GummyBear Fit oggi stesso e iniziate il
          vostro percorso verso il benessere!
        </p>
      </div>`;
      } else {
        result = `
      <div class="change__boxes">
        <div class="change__box-img change__boxes-item1"></div>
          <h2 class="change__title change__boxes-item2">
            Не temete il cambiamento, agite ora!
          </h2>
          <p class="change__text change__boxes-item3">
            Per voi, la cura della salute non è solo una questione di aspetto, ma uno stile di vita. GummyBear Fit vi aiuterà a mantenere il vostro benessere e a godervi ogni nuovo giorno.
          </p>
          <p class="change__text change__text_bold change__boxes-item4">
            Per rimanere in forma e godere di una salute robusta, tutto ciò che dovete fare è prendere 2 gommose dopo la colazione e la cena! È così semplice, vero? Per ordinare GummyBear Fit, è sufficiente compilare il modulo di consegna qui sotto.
          </p>
      </div>
      <div class="change__container">
        <img class="change__container-item1" src="./img/vector-change-1.svg" alt="present" />
        <h4 class="change__container-title change__container-item2">Ma non è tutto!</h4>
        <p class="change__container-text change__container-item3">
          Abbiamo ora una speciale offerta 2x1: ordinando un pacchetto di GummyBear Fit, ne ricevete un secondo in regalo. Affrettatevi, l'offerta sta per scadere!
        </p>
        <p class="change__container-description change__container-item4">
          Non perdete l'opportunità di iniziare un nuovo capitolo nella vostra vita. Ordinate GummyBear Fit oggi stesso e iniziate il vostro percorso verso il benessere!
        </p>
      </div>`;
      }
      textBlock4.innerHTML = result;
    }
  };
  calculateResultBlock2();
  calculateResultBlock3();
  calculateResultBlock4();
});
