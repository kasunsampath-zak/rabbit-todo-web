import { TodoBoard } from "@/components/board/todo-board";
import { GroupsList } from "@/components/groups/groups-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Rabbit Todo</h1>
          <p className="mt-1 text-sm text-gray-600">
            Task management with Jira-style time tracking
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <GroupsList />
          </section>
          <section>
            <TodoBoard />
          </section>
        </div>
      </main>
    </div>
  );
}
