type Customer = {
  id: string;
  name: string;
  phone: string;
  vehicles: number;
};

const demoCustomers: Customer[] = [
  { id: "C-2001", name: "Sam Taylor", phone: "07xxx", vehicles: 1 },
  { id: "C-2002", name: "A Patel", phone: "07xxx", vehicles: 2 }
];

export function CustomersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Customers</h1>
      <div className="rounded-lg border">
        <div className="grid grid-cols-4 gap-2 p-3 text-sm font-medium border-b bg-muted/40">
          <div>Customer</div>
          <div>Phone</div>
          <div>Vehicles</div>
          <div>ID</div>
        </div>
        {demoCustomers.map((c) => (
          <div key={c.id} className="grid grid-cols-4 gap-2 p-3 text-sm border-b last:border-b-0">
            <div className="font-medium">{c.name}</div>
            <div className="text-muted-foreground">{c.phone}</div>
            <div>{c.vehicles}</div>
            <div className="text-muted-foreground">{c.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}