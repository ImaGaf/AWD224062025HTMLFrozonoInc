import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { customerAPI, getCurrentUser } from "@/lib/api";

export default function Profile() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    billingAddress: "",
    shippingAddress: "",
  });

  useEffect(() => {
    document.title = "Perfil del cliente | Barroco Ceramics";
    const current = getCurrentUser();
    setUser(current);
    if (current) {
      setForm({
        firstName: current.firstName || "",
        lastName: current.lastName || "",
        email: current.email || "",
        phone: current.phone || "",
        billingAddress: current.billingAddress || "",
        shippingAddress: current.shippingAddress || "",
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) return;
    setIsSaving(true);
    try {
      const updatePayload = { ...form } as any;
      // Nunca enviamos password desde aquí
      delete updatePayload.password;
      const updated = await customerAPI.update(user._id, updatePayload);

      // Actualizar sesión con los datos nuevos
      const newUser = { ...user, ...updatePayload, ...(typeof updated === "object" ? updated : {}) };
      sessionStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      toast({ title: "Perfil actualizado", description: "Tus datos se guardaron correctamente." });
    } catch (err) {
      toast({ title: "Error", description: "No se pudo guardar el perfil.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Mi perfil</h1>
        <p className="text-muted-foreground text-sm">Actualiza tu información personal y de envío.</p>
      </header>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Información del cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="billingAddress">Dirección de facturación</Label>
              <Input id="billingAddress" value={form.billingAddress} onChange={(e) => setForm((p) => ({ ...p, billingAddress: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingAddress">Dirección de envío</Label>
              <Input id="shippingAddress" value={form.shippingAddress} onChange={(e) => setForm((p) => ({ ...p, shippingAddress: e.target.value }))} />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
