import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, FolderOpen, Calendar, Sparkles } from 'lucide-react';
import { useProjectsStore } from '../store/projectsStore';
import type { ProjectSummary } from '../types/project';

type DashboardPageProps = {
    onOpenProject: (id: string) => void;
};

type ProjectFormData = {
    name: string;
    description: string;
};

const emptyForm = (): ProjectFormData => ({ name: '', description: '' });

const ProjectModal = ({
    title,
    initial,
    onClose,
    onSubmit,
}: {
    title: string;
    initial: ProjectFormData;
    onClose: () => void;
    onSubmit: (data: ProjectFormData) => void;
}) => {
    const [form, setForm] = useState(initial);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Nome do projeto
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Ex: História da minha família"
                            autoFocus
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Descrição
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Descreva brevemente o projeto..."
                            rows={3}
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ProjectCard = ({
    project,
    onOpen,
    onEdit,
    onDelete,
}: {
    project: ProjectSummary;
    onOpen: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) => {
    const formattedDate = new Date(project.updatedAt).toLocaleDateString('pt-BR');

    return (
        <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md">
            <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="truncate text-lg font-semibold text-gray-900">
                            {project.name}
                        </h3>
                        {project.isDemo && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                <Sparkles className="h-3 w-3" />
                                Demo
                            </span>
                        )}
                    </div>
                    {project.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                            {project.description}
                        </p>
                    )}
                </div>
            </div>

            <div className="mb-4 flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formattedDate}
                </span>
                <span>{project.periodCount} períodos</span>
                <span>{project.eventCount} eventos</span>
            </div>

            <div className="mt-auto flex gap-2">
                <button
                    onClick={onOpen}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <FolderOpen className="h-4 w-4" />
                    Abrir
                </button>
                <button
                    onClick={onEdit}
                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                    title="Editar"
                >
                    <Pencil className="h-4 w-4" />
                </button>
                {!project.isDemo && (
                    <button
                        onClick={onDelete}
                        className="rounded-lg border border-gray-200 p-2 text-red-500 hover:bg-red-50"
                        title="Excluir"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

const DashboardPage = ({ onOpenProject }: DashboardPageProps) => {
    const { projects, loadProjects, addProject, editProject, removeProject } = useProjectsStore();
    const [modal, setModal] = useState<'create' | 'edit' | null>(null);
    const [editingProject, setEditingProject] = useState<ProjectSummary | null>(null);

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    const handleCreate = (data: ProjectFormData) => {
        addProject(data.name, data.description);
        setModal(null);
    };

    const handleEdit = (data: ProjectFormData) => {
        if (!editingProject) return;
        editProject(editingProject.id, data.name, data.description);
        setModal(null);
        setEditingProject(null);
    };

    const handleDelete = (project: ProjectSummary) => {
        if (
            window.confirm(
                `Tem certeza que deseja excluir o projeto "${project.name}"? Esta ação não pode ser desfeita.`,
            )
        ) {
            removeProject(project.id);
        }
    };

    const sortedProjects = [...projects].sort((a, b) => {
        if (a.isDemo && !b.isDemo) return -1;
        if (!a.isDemo && b.isDemo) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Timeline</h1>
                        <p className="text-sm text-gray-500">
                            Seus projetos de linha do tempo — dados salvos localmente no navegador
                        </p>
                    </div>
                    <button
                        onClick={() => setModal('create')}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                        Novo projeto
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-8">
                {sortedProjects.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
                        <p className="text-gray-500">Nenhum projeto encontrado.</p>
                        <button
                            onClick={() => setModal('create')}
                            className="mt-4 text-blue-600 hover:underline"
                        >
                            Criar seu primeiro projeto
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onOpen={() => onOpenProject(project.id)}
                                onEdit={() => {
                                    setEditingProject(project);
                                    setModal('edit');
                                }}
                                onDelete={() => handleDelete(project)}
                            />
                        ))}
                    </div>
                )}
            </main>

            {modal === 'create' && (
                <ProjectModal
                    title="Novo projeto"
                    initial={emptyForm()}
                    onClose={() => setModal(null)}
                    onSubmit={handleCreate}
                />
            )}

            {modal === 'edit' && editingProject && (
                <ProjectModal
                    title="Editar projeto"
                    initial={{
                        name: editingProject.name,
                        description: editingProject.description,
                    }}
                    onClose={() => {
                        setModal(null);
                        setEditingProject(null);
                    }}
                    onSubmit={handleEdit}
                />
            )}
        </div>
    );
};

export default DashboardPage;
