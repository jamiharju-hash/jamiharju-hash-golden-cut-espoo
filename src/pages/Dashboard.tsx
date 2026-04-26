import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Star, MapPin, ExternalLink, Calendar, Package, Gift, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  const reviews = [
    {
      author: "Matias Kahila",
      time: "3 months ago",
      text: "Olen Käynyt tässä paikassa noin joka kuukausi 5 vuoden ajan enkä ole kertaakaan pettynyt mahtava paikka ja taitavat tekijät!",
      rating: 5,
    },
    {
      author: "Milan Khalid",
      time: "10 months ago",
      text: "Erittäin mukava ja ammattitaitoinen henkilökunta, harvoin saa näin hyvää palvelua parturissa. Ehdottomasti käyn uudestaan!🥳",
      rating: 5,
    },
    {
      author: "Petri Ryöppy",
      time: "a year ago",
      text: "Erinomaista palvelua ja huolellista ammattityötä. On ihan elämän perusasioita, että on hyvä parturi , johon voi mennä huoletta ja poistua tyytyväisenä. Suosittelen!",
      rating: 5,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-zinc-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            <span>6 Vuotta Asiakkaiden Luottamusta</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Golden Cut</h1>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Premium Barber Shop & Styling in Espoo. Managing bookings, inventory, and gift cards with class.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold border-0">
              <Link to="/appointments">Manage Appointments</Link>
            </Button>
            <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
              <Link to="/products">View Inventory</Link>
            </Button>
          </div>
        </div>
        
        <div className="relative z-10 hidden md:block">
           <div className="flex flex-col gap-3">
             <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-4 rounded-xl flex items-center gap-4">
               <div className="bg-amber-500/10 p-3 rounded-lg text-amber-500"><MapPin className="w-6 h-6" /></div>
               <div>
                  <h4 className="font-semibold text-zinc-100">Location</h4>
                  <p className="text-sm text-zinc-500">Espoon keskus</p>
               </div>
             </div>
             <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-4 rounded-xl flex items-center gap-4">
               <div className="bg-emerald-500/10 p-3 rounded-lg text-emerald-500"><Clock className="w-6 h-6" /></div>
               <div>
                  <h4 className="font-semibold text-zinc-100">Status</h4>
                  <p className="text-sm text-emerald-500">Open Now</p>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/appointments" className="group">
          <Card className="h-full border border-zinc-200 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <CardTitle>Ajanvaraukset</CardTitle>
              <CardDescription>Manage customer bookings and staff schedules.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        
        <Link to="/products" className="group">
          <Card className="h-full border border-zinc-200 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6" />
              </div>
              <CardTitle>Tuotemyynti</CardTitle>
              <CardDescription>Track hair products, inventory levels, and sales.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        
        <Link to="/gift-cards" className="group">
          <Card className="h-full border border-zinc-200 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6" />
              </div>
              <CardTitle>Lahjakortit</CardTitle>
              <CardDescription>Issue and manage digital and physical gift cards.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Brand Dashboard Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>
              <p className="text-zinc-500">What our clients say about Golden Cut</p>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-lg bg-amber-50 px-3 py-1 rounded-full">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {reviews.map((review, i) => (
              <Card key={i} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-2 text-amber-500">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-zinc-700 italic mb-3">"{review.text}"</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-zinc-900">{review.author}</span>
                    <span className="text-zinc-400">{review.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Our Location</h2>
            <p className="text-zinc-500">Espoon keskus, 6 Years at the same place</p>
          </div>
          <div className="rounded-xl overflow-hidden border border-zinc-200 flex-1 min-h-[300px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.469891120876!2d24.658283921660384!3d60.206055417637586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df36efe27437b%3A0x71e90b46c830dc97!2sGolden%20Cut-parturi!5e0!3m2!1sfi!2sfi!4v1777147832008!5m2!1sfi!2sfi" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '350px' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
