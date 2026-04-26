import { useState } from "react";
import { Plus, Search, Gift, CreditCard, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function GiftCards() {
  const [cards, setCards] = useState([
    { id: "GC-8472-A9F1", purchaser: "Matias Kahila", value: 50.00, balance: 50.00, type: "digital", status: "active", expiry: "2024-12-31" },
    { id: "GC-1934-B2C0", purchaser: "Anon", value: 100.00, balance: 25.00, type: "physical", status: "active", expiry: "2024-10-15" },
    { id: "GC-5511-D8E4", purchaser: "Laura", value: 30.00, balance: 0.00, type: "digital", status: "used", expiry: "2024-05-20" },
    { id: "GC-9920-F7G5", purchaser: "Petri Ryöppy", value: 75.00, balance: 75.00, type: "physical", status: "active", expiry: "2025-01-10" },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">Active</Badge>;
      case "used": return <Badge className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-0">Used/Zero Balance</Badge>;
      case "expired": return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">Expired</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    if (type === 'digital') return <Mail className="w-4 h-4 text-purple-500" />;
    return <CreditCard className="w-4 h-4 text-amber-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lahjakortit</h1>
          <p className="text-zinc-500">Sell and validate physical and digital gift cards.</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="border-zinc-300">
             <CheckCircle2 className="w-4 h-4 mr-2" /> Validate Code
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold border-0">
                <Plus className="w-4 h-4 mr-2" /> Issue Gift Card
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Issue New Gift Card</DialogTitle>
                <DialogDescription>
                  Generate a new digital or physical gift card.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="digital" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="digital">Digital (Email)</TabsTrigger>
                  <TabsTrigger value="physical">Physical Card</TabsTrigger>
                </TabsList>
                
                <div className="grid gap-4 py-4 mt-2">
                  <div className="space-y-2">
                     <Label>Value (€)</Label>
                     <div className="flex gap-2">
                       {["25", "50", "75", "100"].map(v => (
                         <Button key={v} type="button" variant="outline" className="flex-1 hover:border-purple-500 hover:text-purple-600">€{v}</Button>
                       ))}
                     </div>
                     <div className="mt-2">
                       <Input type="number" placeholder="Custom Amount..." />
                     </div>
                  </div>
                  
                  <TabsContent value="digital" className="space-y-4 m-0">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient Email</Label>
                      <Input id="recipient" placeholder="Matti.meikäläinen@esimerki.fi" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="msg">Message (Optional)</Label>
                      <Input id="msg" placeholder="Happy Birthday!" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="physical" className="space-y-4 m-0">
                    <div className="space-y-2">
                      <Label htmlFor="code">Generate Code / Scan Pre-printed Card</Label>
                      <div className="flex gap-2">
                         <Input id="code" defaultValue="GC-XXXX-YYYY" className="font-mono text-zinc-500" />
                         <Button variant="secondary">Generate</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <div className="space-y-2">
                     <Label htmlFor="purchaser">Purchaser Name (Optional)</Label>
                     <Input id="purchaser" placeholder="Customer Name" />
                  </div>
                </div>
              </Tabs>
              
              <DialogFooter>
                <Button onClick={() => setIsOpen(false)} className="bg-purple-600 text-white hover:bg-purple-700 w-full sm:w-auto">Process Payment & Issue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white border-zinc-800 md:col-span-1 border-0 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Gift className="w-24 h-24" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-zinc-400">Total Active Value</CardDescription>
            <CardTitle className="text-4xl text-amber-500 tracking-tight">€ 850.00</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400 mt-4">Unredeemed card balances</p>
            <div className="flex flex-col gap-2 mt-6">
               <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Digital Cards</span>
                  <span className="font-medium">€ 450.00</span>
               </div>
               <div className="flex justify-between items-center text-sm pb-2">
                  <span className="text-zinc-400">Physical Cards</span>
                  <span className="font-medium">€ 400.00</span>
               </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Gift Cards</CardTitle>
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input placeholder="Search code/name..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Purchaser</TableHead>
                  <TableHead className="text-right">Balance / Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell className="font-mono text-sm">{card.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-zinc-600 capitalize">
                        {getTypeIcon(card.type)}
                        {card.type}
                      </div>
                    </TableCell>
                    <TableCell>{card.purchaser || <span className="text-zinc-400 italic">Unknown</span>}</TableCell>
                    <TableCell className="text-right">
                       <span className={card.balance > 0 ? "font-semibold text-emerald-600" : "text-zinc-400"}>€{card.balance.toFixed(2)}</span> / <span className="text-zinc-400 text-xs text-muted-foreground">€{card.value.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(card.status)}</TableCell>
                    <TableCell className="text-right">
                      {card.balance > 0 && (
                        <Button variant="ghost" size="sm" className="h-8 group">
                          Redeem
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-8 text-zinc-500">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
