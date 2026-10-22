import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { getIndexableOrigin } from "@/lib/site";

const origin = getIndexableOrigin();

export const metadata: Metadata = {
  title: "Datenschutzerklärung | La Piazza Ristorante Wismar",
  description: "Informationen zur Verarbeitung personenbezogener Daten auf der Website von La Piazza Ristorante Wismar.",
  ...(origin ? { alternates: { canonical: `${origin}/datenschutz` } } : {}),
};

export default function DatenschutzPage() {
  return <LegalPage title="Datenschutzerklärung" eyebrow="Datenschutz & Transparenz" updated="Stand: 23. Oktober 2026" otherHref="/impressum" otherLabel="Impressum">
    <section aria-labelledby="verantwortlicher">
      <h2 id="verantwortlicher">1. Verantwortlicher</h2>
      <address>
        La Piazza Ristorante Wismar<br />
        Inhaber: Antonio Ciccotto<br />
        Am Markt 7, 23966 Wismar, Deutschland<br />
        E-Mail: <a href="mailto:info@lapiazzawismar.com">info@lapiazzawismar.com</a><br />
        Telefon: <a href="tel:+4915737497525">+49 157 37497525</a>
      </address>
    </section>

    <section aria-labelledby="hosting">
      <h2 id="hosting">2. Aufruf der Website und Hosting</h2>
      <p>Die Website wird als statische Website bereitgestellt. Für den Produktivbetrieb ist Cloudflare Pages als Hosting- und Auslieferungsdienst vorgesehen. Beim Aufruf einer Website werden technisch notwendige Verbindungsdaten verarbeitet. Dazu können insbesondere die IP-Adresse, Datum und Uhrzeit der Anfrage, die angeforderte Adresse, Referrer-Informationen sowie Angaben zu Browser und Betriebssystem gehören. Diese Daten sind erforderlich, um die angeforderte Seite auszuliefern, den sicheren und stabilen Betrieb zu ermöglichen und Störungen oder Angriffe zu erkennen.</p>
      <p>Rechtsgrundlage für die Verarbeitung durch den Verantwortlichen ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt im sicheren, funktionsfähigen und effizienten Betrieb der Website. Cloudflare verarbeitet die für die Bereitstellung übermittelte Verbindung und kann dabei insbesondere IP- und Verkehrsdaten erhalten. Cloudflare ist nach der geplanten Architektur Hosting-/CDN-Dienstleister und Empfänger der hierfür erforderlichen Daten; weitere Empfänger oder Unterauftragsverarbeiter können sich aus den für das Cloudflare-Konto geltenden Vertragsunterlagen ergeben.</p>
      <p>Die Website selbst führt keine Besucher-IP-Adressen in einer eigenen Datenbank zusammen. Ob und in welchem Umfang Cloudflare im konkret eingerichteten Konto Protokolldaten speichert, wie lange dies geschieht und welche Unterauftragsverarbeiter oder internationalen Übermittlungen im Einzelfall gelten, hängt von den gebuchten und aktivierten Diensten sowie den Vertrags- und Kontoeinstellungen ab. Diese Angaben sind vor dem Produktivstart anhand des Cloudflare-Kontos und der dort geltenden Datenschutz- und Vertragsunterlagen zu bestätigen. Eine konkrete Speicherdauer wird deshalb hier nicht behauptet. Maßgeblich sind die technisch und vertraglich festgelegten Fristen; die Daten werden nach den dort geltenden Kriterien gelöscht oder anonymisiert.</p>
      <p>Cloudflare ist ein international tätiger Anbieter. Eine Verarbeitung außerhalb der EU/des EWR oder ein Zugriff aus einem Drittland kann abhängig von der konkreten Konfiguration und den Vertragsbedingungen nicht ausgeschlossen werden. Die hierfür maßgeblichen Übermittlungsgrundlagen und Garantien, etwa ein Angemessenheitsbeschluss oder geeignete Garantien, sind den beim Produktivbetrieb geltenden Cloudflare-Unterlagen zu entnehmen und vor Freischaltung zu prüfen. Informationen finden Sie in der <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Cloudflare</a> und im <a href="https://www.cloudflare.com/cloudflare-customer-dpa/" target="_blank" rel="noopener noreferrer">Cloudflare Data Processing Addendum</a>.</p>
    </section>

    <section aria-labelledby="fonts">
      <h2 id="fonts">3. Schriftarten</h2>
      <p>Die Website verwendet Schriftarten aus Google Fonts über Next.js. Die Schriftdateien werden während des Builds abgerufen und als statische Dateien zusammen mit der Website ausgeliefert. Der Browser lädt sie von der Website selbst; nach dem aktuellen Build sind dafür keine Anfragen des Besuchers an Google Fonts vorgesehen. Sollte sich die Build- oder Auslieferungskonfiguration ändern, wird diese Information angepasst.</p>
    </section>

    <section aria-labelledby="storage">
      <h2 id="storage">4. Speicherung im Browser</h2>
      <p>Die Website verwendet kein Cookie- oder Local-Storage-Skript im Anwendungscode. Sie nutzt jedoch den <code>sessionStorage</code> des Browsers mit dem Eintrag <code>la-piazza-intro-complete</code>, um nach dem erstmaligen Abschluss der Intro-Animation diese Animation bei weiteren Aufrufen im selben Tab zu überspringen. Der Eintrag enthält nur diesen Status, wird nicht an den Websitebetreiber übertragen und steht grundsätzlich nur für die Dauer der jeweiligen Browser-Tab-Sitzung zur Verfügung. Bei nicht verfügbarem Speicher funktioniert die Website weiterhin; die Intro-Animation kann dann erneut erscheinen.</p>
      <p>Die Speicherung bzw. der Zugriff auf Informationen im Endgerät richtet sich zusätzlich nach § 25 TDDDG. Ob für diesen Komfortstatus die Ausnahme der unbedingt erforderlichen Speicherung greift, ist anhand der konkreten Ausgestaltung rechtlich zu bewerten. Der Status wird nicht für Analyse, Werbung oder Profilbildung verwendet.</p>
    </section>

    <section aria-labelledby="kontakt">
      <h2 id="kontakt">5. Kontaktaufnahme</h2>
      <p>Die Website stellt E-Mail- und Telefonlinks bereit. Diese Links übermitteln bei bloßer Anzeige keine Kontaktinhalte an uns. Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten und Kommunikationsinhalte, um Ihre Anfrage zu bearbeiten und gegebenenfalls vorvertragliche oder vertragliche Schritte zu ermöglichen.</p>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern es um vorvertragliche Maßnahmen oder die Durchführung eines Vertrags geht, andernfalls Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an der Beantwortung eingehender Anfragen. Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen oder eine weitere Speicherung zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist. Bitte senden Sie keine besonders vertraulichen Informationen, die für Ihre Anfrage nicht erforderlich sind.</p>
      <p>Die Angabe von Kontaktdaten ist freiwillig. Ohne eine erreichbare Rückrufnummer oder E-Mail-Adresse kann eine Antwort gegebenenfalls nicht erfolgen. Bei der Nutzung von E-Mail oder Telefon werden die Nachrichten außerdem über die von Ihnen und dem Restaurant genutzten Kommunikationsdienste übertragen; deren konkrete Anbieter lassen sich aus dem Websitecode nicht feststellen.</p>
    </section>

    <section aria-labelledby="extern">
      <h2 id="extern">6. Externe Links</h2>
      <p>Die Website enthält Links zu Google Maps und Instagram. Es sind keine Karten, Social-Media-Inhalte oder sonstigen Dienste dieser Anbieter in die Website eingebettet. Erst wenn Sie einen externen Link anklicken, wird eine Verbindung zum jeweiligen Anbieter hergestellt. Dabei gelten die Datenschutzinformationen des Anbieters; auf dessen anschließende Datenverarbeitung haben wir keinen Einfluss.</p>
    </section>

    <section aria-labelledby="tracking">
      <h2 id="tracking">7. Analyse und Werbung</h2>
      <p>Im geprüften Quellcode sind keine Analyse- oder Marketingdienste, Tracking-Pixel oder Werbeskripte eingebunden. Es gibt auf der Website keine Kontaktformulare und keine eingebetteten YouTube- oder Google-Maps-Player.</p>
    </section>

    <section aria-labelledby="rechte">
      <h2 id="rechte">8. Ihre Rechte</h2>
      <p>Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft über Ihre personenbezogenen Daten (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen eine Verarbeitung auf Grundlage berechtigter Interessen (Art. 21 DSGVO). Soweit eine Verarbeitung auf einer Einwilligung beruht, können Sie diese mit Wirkung für die Zukunft widerrufen. Zur Ausübung Ihrer Rechte genügt eine Nachricht an die oben genannte E-Mail-Adresse.</p>
      <p>Sie haben außerdem das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren (Art. 77 DSGVO), insbesondere bei der Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.</p>
    </section>

    <section aria-labelledby="aufsicht">
      <h2 id="aufsicht">9. Zuständige Datenschutzaufsicht in Mecklenburg-Vorpommern</h2>
      <address>
        Der Landesbeauftragte für Datenschutz und Informationsfreiheit Mecklenburg-Vorpommern<br />
        Schloss Schwerin, Lennéstraße 1<br />
        19053 Schwerin<br />
        Telefon: <a href="tel:+49385594940">+49 385 59494 0</a><br />
        E-Mail: <a href="mailto:info@datenschutz-mv.de">info@datenschutz-mv.de</a><br />
        Website: <a href="https://www.datenschutz-mv.de/" target="_blank" rel="noopener noreferrer">datenschutz-mv.de</a>
      </address>
    </section>

    <section aria-labelledby="aenderungen">
      <h2 id="aenderungen">10. Änderungen dieser Datenschutzerklärung</h2>
      <p>Wenn sich die Website oder die damit verbundenen Verarbeitungsvorgänge wesentlich ändern, wird diese Datenschutzerklärung entsprechend aktualisiert.</p>
    </section>

    <section aria-labelledby="weitere-hinweise">
      <h2 id="weitere-hinweise">11. Weitere Hinweise</h2>
      <p>Es besteht keine gesetzliche oder vertragliche Pflicht, die Website zu besuchen oder Kontaktangaben zu machen. Eine automatisierte Entscheidungsfindung einschließlich Profiling findet nach dem geprüften Implementierungsstand nicht statt.</p>
    </section>
  </LegalPage>;
}
