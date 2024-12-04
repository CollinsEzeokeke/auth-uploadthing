'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

const initialProducts: Product[] = [
  { id: 1, name: 'Product A', price: 19.99, stock: 50 },
  { id: 2, name: 'Product B', price: 29.99, stock: 30 },
  { id: 3, name: 'Product C', price: 39.99, stock: 20 },
]

export function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', price: 0, stock: 0 })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }])
    setNewProduct({ name: '', price: 0, stock: 0 })
    setIsDialogOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Inventory Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter the details of the new product to add to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="product-stock">Stock</Label>
                <Input
                  id="product-stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}

