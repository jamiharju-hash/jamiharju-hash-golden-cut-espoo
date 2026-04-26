import { useState } from "react";
import { Plus, Search, Tag, AlertCircle, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";

export default function Inventory() {
  const [products, setProducts] = useState([
    { id: "P101", name: "Matte Clay Wax", brand: "Golden Cut Signature", category: "Styling", stock: 12, price: 18.50, status: "in_stock" },
    { id: "P102", name: "Beard Oil (Sandalwood)", brand: "Lumberjack", category: "Beard Care", stock: 3, price: 24.00, status: "low_stock" },
    { id: "P103", name: "Sea Salt Spray", brand: "OceanTexture", category: "Styling", stock: 0, price: 15.00, status: "out_of_stock" },
    { id: "P104", name: "Cooling Aftershave", brand: "Golden Cut Signature", category: "Shaving", stock: 8, price: 22.00, status: "in_stock" },
    { id: "P105", name: "Premium Pomade", brand: "Classic Gents", category: "Styling", stock: 5, price: 20.00, status: "in_stock" },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const getStockBadge = (stock: number, status: string) => {
    if (stock === 0 || status === "out_of_stock") return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">Out of Stock</Badge>;
    if (stock <= 3 || status === "low_stock") return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">Low Stock ({stock})</Badge>;
    return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">In Stock ({stock})</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tuotemyynti</h1>
          <p className="text-zinc-500">Manage barber shop products and inventory.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={<Button className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold border-0" />}>
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new inventory item to the shop.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="E.g. Matte Clay Wax" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" placeholder="E.g. Golden Cut Signature" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Styling" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="styling">Styling</SelectItem>
                      <SelectItem value="beard">Beard Care</SelectItem>
                      <SelectItem value="shaving">Shaving</SelectItem>
                      <SelectItem value="shampoo">Shampoo & Conditioner</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (€)</Label>
                  <Input id="price" type="number" placeholder="0.00" step="0.01" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Initial Stock Quantity</Label>
                <Input id="stock" type="number" placeholder="10" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsOpen(false)} className="bg-zinc-900 text-white hover:bg-zinc-800">Add to Inventory</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         <Card>
           <CardHeader className="pb-2">
             <CardDescription>Total Products</CardDescription>
             <CardTitle className="text-3xl">45</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-sm text-zinc-500">Across 5 categories</p>
           </CardContent>
         </Card>
         <Card>
           <CardHeader className="pb-2">
             <CardDescription>Low Stock Alerts</CardDescription>
             <CardTitle className="text-3xl text-amber-500 flex items-center gap-2">
               8 <AlertCircle className="w-5 h-5" />
             </CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-sm text-zinc-500">Items need reordering</p>
           </CardContent>
         </Card>
         <Card className="bg-zinc-900 text-white border-zinc-800">
           <CardHeader className="pb-2">
             <CardDescription className="text-zinc-400">Total Inventory Value</CardDescription>
             <CardTitle className="text-3xl text-emerald-400">€ 1,240.50</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-sm text-zinc-400">Estimated retail value</p>
           </CardContent>
         </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Inventory List</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-[200px] sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input placeholder="Search products..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon"><Tag className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-zinc-500">{item.id}</TableCell>
                  <TableCell>
                    <div className="font-medium text-zinc-900">{item.name}</div>
                    <div className="text-xs text-zinc-500">{item.brand}</div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">€{item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{getStockBadge(item.stock, item.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 group">
                       <ShoppingBag className="w-4 h-4 mr-1 text-emerald-600 group-hover:text-emerald-700" />
                       Sell
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-zinc-500">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
