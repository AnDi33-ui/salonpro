import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scissors, Calendar, Users, BarChart3, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Scissors className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-900">SalonPro</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/features" className="text-gray-600 hover:text-purple-600">Funzionalità</Link>
          <Link href="/pricing" className="text-gray-600 hover:text-purple-600">Prezzi</Link>
          <Link href="/contact" className="text-gray-600 hover:text-purple-600">Contatti</Link>
          <Link href="/auth/signin">
            <Button variant="outline" size="sm">
              Accedi
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Il CRM perfetto per il tuo 
          <span className="text-purple-600"> salone</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Gestisci appuntamenti, clienti e team in un'unica piattaforma. 
          Aumenta il fatturato del 30% e risparmia 2 ore al giorno.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signin">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Prova Gratis 30 Giorni
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Guarda la Demo
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Tutto quello che serve al tuo salone
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gestione Appuntamenti</h3>
            <p className="text-gray-600">Calendario intelligente con reminder automatici. Riduci i no-show del 40%.</p>
          </div>
          <div className="text-center p-6">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Database Clienti</h3>
            <p className="text-gray-600">Schede complete con storico trattamenti, preferenze e allergie.</p>
          </div>
          <div className="text-center p-6">
            <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics Avanzati</h3>
            <p className="text-gray-600">Dashboard con metriche di business e performance del team.</p>
          </div>
          <div className="text-center p-6">
            <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Marketing Automatico</h3>
            <p className="text-gray-600">Email personalizzate per compleanni, promozioni e follow-up.</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Già scelto da centinaia di saloni
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <p className="text-gray-600 mb-4 italic">
                "Con SalonPro abbiamo aumentato il fatturato del 25% in 3 mesi. 
                Il sistema è intuitivo e ci fa risparmiare ore di lavoro."
              </p>
              <div className="font-semibold">Maria Rossi</div>
              <div className="text-sm text-gray-500">Salone Bellezza, Milano</div>
            </div>
            <div className="p-6 border rounded-lg">
              <p className="text-gray-600 mb-4 italic">
                "Finalmente un software pensato per noi parrucchieri. 
                La gestione clienti è fantastica!"
              </p>
              <div className="font-semibold">Luca Bianchi</div>
              <div className="text-sm text-gray-500">Hair Design, Roma</div>
            </div>
            <div className="p-6 border rounded-lg">
              <p className="text-gray-600 mb-4 italic">
                "I reminder automatici hanno eliminato i no-show. 
                Consiglio SalonPro a tutti i colleghi."
              </p>
              <div className="font-semibold">Anna Verde</div>
              <div className="text-sm text-gray-500">Style Center, Napoli</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto a far crescere il tuo salone?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Inizia la prova gratuita oggi. Nessuna carta di credito richiesta.
          </p>
          <Link href="/auth/signin">
            <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
              Inizia Subito - Gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="h-6 w-6" />
              <span className="text-xl font-bold">SalonPro</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 SalonPro. Tutti i diritti riservati.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
