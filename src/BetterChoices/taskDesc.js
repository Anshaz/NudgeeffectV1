export default [(group, country)=>`


<h1>Aufgabenbeschreibung</h1>
<p>Liebe Teilnehmerin, lieber Teilnehmer</p>

<p>Heute kaufen Sie Lebensmittel in einem Online-Supermarkt ein. </p>

<p>	Wir bitten Sie die Lebensmittel einzukaufen, die Sie <b>für sich selbst für den Zeitraum von eine Woche</b> einkaufen würden. Dazu steht Ihnen ein <b>Budget von maximal ${country == 'de' ? '€25':'CHF 35.-'}</b> zur Verfügung. Gehen Sie bitte davon aus, dass Sie einen <b>gewöhnlichen Einkauf</b> durchführen. Aussergewöhnliche Ereignisse, die in der kommenden Woche anstehen könnten (z.B. ein geplantes gemeinsames Essen mit Freunden), bitten wir Sie, nicht in Ihren Einkauf einzubeziehen.
</p>`,(group, country)=>`

<p>Wenn Sie ein Produkt kaufen möchten, geht das <b>via Klick auf das kleine „Plus“ in der Produktübersicht</b> (siehe unten). In die Detailansicht wechseln Sie, indem Sie auf das Bild des Produktes oder seinen Namen klicken. </p>
<img src="${chrome.runtime.getURL('task-1.png')}"/>
<img src="${chrome.runtime.getURL('task.png')}" width="100px"/>

<p>Die Detailansicht liefert folgende Informationen zu dem Produkt:</p>
<li style="padding-left:20px">Name des Produktes</li>
<li style="padding-left:20px">Detaillierte Abbildung und Produktbeschreibung</li>
<li style="padding-left:20px">Preis</li>
<li style="padding-left:20px">Allgemeine Produktinformationen</li>
<li style="padding-left:20px">Zutaten des Produktes</li>
${group == 'A','B','C' ? '<li style="padding-left:20px">Nachhaltigkeitsbewertung dargestellt als fünfstufige Farb- und Buchstabenskala </li> <p> Bei letzerem wird ein Überblick über die Nachhaltigkeit eines Produktes gegeben (E, D, C, B, A). Dabei ist A der beste und E der schlechteste Wert. Die Nachhaltigkeitsbewertung bezieht Erderwärmung, Feinstaubbelastung, Wassernutzung, Bodennutzung, Tierwohl und ob ein Produkt Bio ist mit ein. </p> <img style="max-height:800px" src="'+chrome.runtime.getURL('task-AB-ch.png')+'"</p>':'<img style="max-height:800px" src="'+chrome.runtime.getURL('task-C-ch.png')+'"/>'}
`,(group, country)=>`


<p>Die Artikel, die sich aktuell in ihrem Warenkorb befinden, können Sie jederzeit durch einen Klick auf das Einkaufswagen-Symbol am oberen rechten Bildrand einsehen. Dort können Sie auch bereits gewählte Produkte wieder entfernen. Über das „?“-Symbol können Sie diese Aufgabenbeschreibung jederzeit erneut aufrufen. </p>
<img src="${chrome.runtime.getURL('task-delete.png')}" width="300px"/>
<p>Wenn Sie ein Produkt kaufen möchten, fügen Sie es zu Ihrem Warenkorb hinzu.<b> Bitte fügen sie Produkte erst hinzu, sobald die Seite fertig geladen hat.</b> Sobald Sie alle gewünschten Produkte hinzugefügt haben, klicken Sie auf das Einkaufswagen-Symbol am oberen rechten Rand und wählen unten „Zur Kasse“.<img src="${chrome.runtime.getURL("task-2.png")}" width="100px"/></p>

<p> Auf der Produktübersichtsseite von Rewe finden Sie im linken Bereich diverse Filter. Mit denen Sie die Produktauswahl nach Ihren Wünschen anpassen können (z.B. Bio oder Nachhaltig).</p>
<img src="${chrome.runtime.getURL('filter-products.png')}"/>
`,






(group, country) => country == 'ch' ? '<p><b>Als zusätzliche Vergütung für die Teilnahme an der Studie werden unter allen Teilnehmenden fünf Personen ausgelost, die ihren zusammengestellten Warenkorb erhalten.</b> Geben Sie dazu bitte am Ende der Umfrage Ihre E-Mail-Adresse an, damit wir Sie im Gewinnfall kontaktieren können. Die E-Mail-Adresse dient nur zur Benachrichtigung und wird nach der Studie gelöscht. </p>' : '<p><b>Als zusätzliche Vergütung für die Teilnahme an der Studie werden unter allen Teilnehmenden fünf Personen ausgelost, die ihren zusammengestellten Warenkorb erhalten.</b> Geben Sie dazu bitte am Ende der Umfrage Ihre E-Mail-Adresse an, damit wir Sie im Falle eines Gewinns kontaktieren können. Die E-Mail-Adresse dient nur zur Benachrichtigung und wird nach der Studie gelöscht. Um Ihre davon unabhängige Grundvergütung zu erhalten, ist es wichtig, dass die Studie komplett bis zum Ende des Anschlussfragebogens ausgefüllt wird, da dort ein Link bereitgestellt wird</p>']
