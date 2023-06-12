# Description du système de capteurs :
## Type de capteurs
Pour assurer le bien-être des cinéphiles, plusieurs capteurs pourraient être nécessaires. Notamment :
- **Capteur de qualité de l'air** : Il peut mesurer plusieurs paramètres comme les PM2.5, PM10, CO2, COV (Composés Organiques Volatiles), température, humidité. Un exemple pourrait être le capteur BME680 de Bosch qui mesure la température, l'humidité, la pression et les COV.
- **Capteur de bruit** : pour surveiller le niveau de bruit dans les salles et assurer une expérience de visionnage confortable.
- **Capteur de lumière** : pour contrôler l'éclairage en fonction de la luminosité ambiante.

##  Emplacement des capteurs
Les capteurs pourraient être placés à différents endroits dans chaque salle, y compris près de l'écran, à l'arrière de la salle, et au milieu pour obtenir une mesure précise et uniforme. Ils pourraient également être placés à l'extérieur des salles pour mesurer les conditions dans les espaces communs.

# Description du système de gestion
## Actions basées sur les capteurs
Le système pourrait prendre plusieurs actions en fonction de la lecture des capteurs. Par exemple, si la qualité de l'air est mauvaise (CO2 élevé), le système pourrait augmenter la ventilation. Si le niveau de bruit dépasse un certain seuil, le système pourrait envoyer une alerte à la sécurité ou au personnel de la salle.

# Types de capteurs et leur fonctions
## 1. Capteur de qualité de l'air :

Un capteur de qualité de l'air est un dispositif qui peut mesurer plusieurs paramètres liés à la qualité de l'air dans son environnement :

- **Température** : Les capteurs de qualité de l'air sont généralement capables de mesurer des températures allant de -40 à +85 degrés Celsius avec une précision de ±1 degré Celsius.
- **Humidité** : Ils peuvent mesurer des niveaux d'humidité allant de 0 à 100% avec une précision de ±3%.
- **Pression barométrique** : Ces capteurs peuvent également mesurer des pressions atmosphériques allant de 300 à 1100 hPa avec une précision de ±1 hPa.
- **Composés organiques volatils (COV)** : Ils disposent souvent d'un capteur de gaz qui peut détecter une large gamme de COV.

## 2. Capteur de bruit :

Un capteur de bruit est un dispositif qui combine un microphone avec quelques circuits de traitement du signal pour détecter différents niveaux de bruit. Voici les informations qu'il peut fournir :

- **Niveau de bruit analogique** : Les capteurs de bruit fournissent généralement une sortie analogique qui correspond au niveau de bruit mesuré par le microphone.
- **Sortie de porte de bruit** : Ils fournissent aussi une sortie numérique qui indique si le niveau de bruit dépasse un certain seuil.
- **Sortie "Enveloppe"** : Ils peuvent également fournir une sortie analogique qui donne une représentation de l'amplitude du signal sonore.

## 3. Capteur de lumière :

Un capteur de lumière est un dispositif capable de mesurer la luminosité de son environnement. Il peut fournir les informations suivantes :

- **Deux capteurs de lumière** : La plupart des capteurs de lumière sont équipés de deux détecteurs de lumière. L'un est sensible à l'ensemble du spectre, tandis que l'autre est principalement sensible à la lumière infrarouge.
- **Conversion numérique** : Ils fournissent une sortie numérique, ce qui facilite l'intégration avec d'autres composants électroniques.
- **Interface I2C** : Ces capteurs utilisent généralement l'interface I2C, ce qui signifie qu'ils peuvent être facilement connectés à la plupart des microcontrôleurs.