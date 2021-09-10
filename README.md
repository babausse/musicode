1. A quoi correspondent les données présentes dans le résultat de la fonction getByteFrequencyData ? Sont-ce des volumes absolus en dB ? Des volumes relatifs ? Et dans ce cas par rapport à quoi ?

-> https://stackoverflow.com/questions/24083349/understanding-getbytetimedomaindata-and-getbytefrequencydata-in-web-audio

Les résultats de getByteFrequencyData sont donnés de 0 à 255, et mappés sur le min_dB et max_dB, dont l'intervalle est donc divisé en 255 valeurs possibles. Si :
- min_dB = -30
- max_dB = 1
-> alors une valeur de 127 correspondra à 0dB

2. Comment peut-on déterminer la fréquence de chaque byte de donnée dans les résultats de getByteFrequencyData ? Quelles sont les limites hautes et basses en fréquence pour pouvoir ensuite diviser en un nombre de sections, et donc de fréquences différentes ?

-> https://stackoverflow.com/questions/44502536/determining-frequencies-in-js-audiocontext-analysernode

MIN_FREQ = 0 (en Hz) ; MAX_FREQ = audioContext.sampleRate / 2 (par défaut 24KHz)

Reste à faire :
- le calibrage ("étouffez les cordes", "jouez fort") qui donnera les volumes minimum et maximum
- la détection de pics pour détecter les fréquences jouées, donc les notes
- l'affinage du fftsize et du sampleRate pour être sûr de capturer les bonnes fréquences selon les instruments (ex pour la basse : de la E à vide à la G 24ème case)

Intéressant à offrir :
- l'accordage en modifiant le sampleRate et le fftsize pour analyser précisément une plage sonore bien définie (de 0 à un peu après la note demandée pour avoir un spectre le plus précis possible ? Ou de 0 au premier Si par exemple)