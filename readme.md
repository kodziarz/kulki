# Kulki
## Opis
Projekt jest realizacją gry "kulki", która polega przesuwaniu kulek tak, by się kuliki tego samego kolory zblokowały w 5 w pionie, poziomie lub na ukos. Do wyszukiwania trasy podglądu został zastosowany specyficzny algorytm współbieżny z wykorzystaniem [Web Workeów](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). Nistety implementacja cierpi na problemy ze stabilnością.

## Użycie
Do uruchomienia konieczne jest zhostowanie plików projektu (np. za pomocą [live servera](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)). Wówczas należy otworyć w przeglądarce plik [index.html](index.html).


## Problemy
Program wyświetla ścieżkę z dość dużym opóźnieniem. Gdyby jednak tego nie robił, czasem pomaga odznaczenie i zaznaczenie ponownie danej kulki.

