# Textify

This project is the project I contributed to in GenesysHack 2017, which is the 3rd place in the final result. The original repository used in hackthon is held by Suhas Kabinna (kloudKlown).

Currently, there are mainly two communication methods between company and customer -- call or web chat. Generally speaking, setting a call center is expensive for a company (the required equipments are expensive), while web chat is time-consuming (typing takes time and user doesn't like it). This project aims to provide a sweet spot. We enhanced web chat by adding voice-to-text functionality with the help of Bing Speech API, so that user can speak out what he wants to express and the message will be sent to the other end in text. 

The web chat platform is the Purecloud WebChat platform provided by Genesys. Since we have no access to the source code of Purecloud, the add button process in done by the Chrome Extention we wrote. Also, if having the Purecloud account, you can bind this project to localhost Port 3000, using https and then you will be able to load this project to you own Purecloud space.