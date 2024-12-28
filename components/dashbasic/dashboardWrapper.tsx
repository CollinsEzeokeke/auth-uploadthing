
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package, Award, ShoppingBag } from "lucide-react";

const BasicDashboard = () => {
  // Mock data - in a real app this would come from an API
  const purchaseHistory = [
    { id: 1, date: "2024-03-10", item: "Gaming Laptop", amount: 1200 },
    { id: 2, date: "2024-03-08", item: "Wireless Mouse", amount: 50 },
    { id: 3, date: "2024-03-05", item: "Keyboard", amount: 100 },
  ];

  const rewardPoints = 750;
  const nextTierPoints = 1000;
  const currentTier = "Silver";

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,350</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rewardPoints}</div>
            <Progress 
              value={(rewardPoints / nextTierPoints) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {nextTierPoints - rewardPoints} points to next tier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Tier</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentTier}</div>
            <p className="text-xs text-muted-foreground">
              Member since Mar 2024
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {purchaseHistory.map((purchase) => (
              <div
                key={purchase.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{purchase.item}</p>
                  <p className="text-sm text-muted-foreground">
                    {purchase.date}
                  </p>
                </div>
                <div className="font-medium">
                  ${purchase.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicDashboard;