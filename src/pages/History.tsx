import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Calendar,
  Star,
  Play,
  FileText,
  Download,
  BarChart3,
  Trash2,
  CheckSquare,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const historyData = [
  { id: "1", title: "Senior SWE", company: "Google", date: "2024-01-15", duration: "45 min", rating: 4.5, type: "Technical" },
  { id: "2", title: "Product Manager", company: "Meta", date: "2024-01-12", duration: "30 min", rating: 4.0, type: "Behavioral" },
  { id: "3", title: "Frontend Dev", company: "Amazon", date: "2024-01-10", duration: "40 min", rating: 3.5, type: "Technical" },
  { id: "4", title: "Data Scientist", company: "Netflix", date: "2024-01-08", duration: "50 min", rating: 4.8, type: "Mixed" },
  { id: "5", title: "DevOps Engineer", company: "Apple", date: "2024-01-05", duration: "35 min", rating: 4.2, type: "Technical" },
  { id: "6", title: "UX Designer", company: "Spotify", date: "2024-01-03", duration: "25 min", rating: 3.8, type: "Behavioral" },
];

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredData = historyData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || item.type.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkExport = () => {
    toast({
      title: "Exporting selected interviews",
      description: `${selectedItems.length} interviews will be exported.`,
    });
  };

  const handleBulkDelete = () => {
    toast({
      title: "Deleted",
      description: `${selectedItems.length} interviews have been deleted.`,
    });
    setSelectedItems([]);
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < Math.floor(rating) ? "fill-warning text-warning" : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating}</span>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Interview History</h1>
            <p className="text-muted-foreground">View and manage all your past mock interviews</p>
          </div>
          {selectedItems.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBulkExport}>
                <Download className="w-4 h-4 mr-2" />
                Export ({selectedItems.length})
              </Button>
              <Link to={`/compare?ids=${selectedItems.join(",")}`}>
                <Button variant="default">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Compare ({selectedItems.length})
                </Button>
              </Link>
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by role or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="behavioral">Behavioral</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Interview</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-accent/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleSelect(item.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.type}</Badge>
                  </TableCell>
                  <TableCell>{renderStars(item.rating)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/interview/${item.id}/player`}>
                          <Play className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/interview/${item.id}/evaluation`}>
                          <FileText className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No interviews found matching your criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
