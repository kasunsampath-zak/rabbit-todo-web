import { Navigation } from "@/components/layout/navigation";
import { TodoBoard } from "@/components/board/todo-board";

export default function TodosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TodoBoard />
      </main>
    </div>
  );
}
