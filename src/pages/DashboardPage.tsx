import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Plus,
    Pencil,
    Trash2,
    FolderOpen,
    Calendar,
    Sparkles,
    Download,
    Upload,
    Home,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useProjectsStore } from '@/store/projectsStore';
import { confirmAction, toast } from '@/store/uiStore';
import PortfolioFooter from '@/components/layout/PortfolioFooter';
import {
    DEMO_PROJECT_ID,
    exportAllProjects,
    exportProjectById,
    importProjectFromJson,
} from '@/services/projectStorageService';
import type { ProjectSummary } from '@/types/project';
import { cn } from '@/lib/utils';

type ProjectFormData = {
    name: string;
    description: string;
};

const emptyForm = (): ProjectFormData => ({ name: '', description: '' });

const ProjectModal = ({
    title,
    open,
    initial,
    onClose,
    onSubmit,
}: {
    title: string;
    open: boolean;
    initial: ProjectFormData;
    onClose: () => void;
    onSubmit: (data: ProjectFormData) => void;
}) => {
    if (!open) return null;

    return (
        <ProjectModalContent
            key={`${title}-${initial.name}-${initial.description}`}
            title={title}
            initial={initial}
            onClose={onClose}
            onSubmit={onSubmit}
        />
    );
};

const ProjectModalContent = ({
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
        <Dialog open onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="project-name">Nome do projeto</Label>
                        <Input
                            id="project-name"
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Ex: História da minha família"
                            autoFocus
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-description">Descrição</Label>
                        <Textarea
                            id="project-description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Descreva brevemente o projeto..."
                            rows={3}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const ProjectCard = ({
    project,
    onOpen,
    onEdit,
    onDelete,
    onExport,
}: {
    project: ProjectSummary;
    onOpen: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onExport: () => void;
}) => {
    const formattedDate = new Date(project.updatedAt).toLocaleDateString('pt-BR');

    return (
        <Card className="group transition hover:border-primary/40 hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <CardTitle className="truncate text-lg">{project.name}</CardTitle>
                    {project.isDemo && (
                        <Badge
                            variant="secondary"
                            className="shrink-0 gap-1 bg-amber-100 text-amber-800"
                        >
                            <Sparkles className="h-3 w-3" />
                            Demo
                        </Badge>
                    )}
                </div>
                {project.description && (
                    <CardDescription className="line-clamp-2">
                        {project.description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent className="pb-3">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formattedDate}
                    </span>
                    <span>{project.periodCount} períodos</span>
                    <span>{project.eventCount} eventos</span>
                </div>
            </CardContent>

            <CardFooter className="gap-2">
                <Button onClick={onOpen} className="flex-1 gap-2">
                    <FolderOpen className="h-4 w-4" />
                    Abrir
                </Button>
                <Button variant="outline" size="icon" onClick={onExport} title="Exportar JSON">
                    <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={onEdit} title="Editar">
                    <Pencil className="h-4 w-4" />
                </Button>
                {!project.isDemo && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onDelete}
                        title="Excluir"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

const downloadJson = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
};

const DashboardPage = () => {
    const navigate = useNavigate();
    const importInputRef = useRef<HTMLInputElement>(null);
    const { projects, loadProjects, addProject, editProject, removeProject } = useProjectsStore();
    const [modal, setModal] = useState<'create' | 'edit' | null>(null);
    const [editingProject, setEditingProject] = useState<ProjectSummary | null>(null);

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    const handleCreate = (data: ProjectFormData) => {
        addProject(data.name, data.description);
        setModal(null);
        toast.success('Projeto criado com sucesso.');
    };

    const handleEdit = (data: ProjectFormData) => {
        if (!editingProject) return;
        editProject(editingProject.id, data.name, data.description);
        setModal(null);
        setEditingProject(null);
        toast.success('Projeto atualizado.');
    };

    const handleDelete = async (project: ProjectSummary) => {
        const confirmed = await confirmAction({
            title: 'Excluir projeto',
            message: `Tem certeza que deseja excluir "${project.name}"? Esta ação não pode ser desfeita.`,
            confirmLabel: 'Excluir',
            destructive: true,
        });
        if (confirmed && removeProject(project.id)) {
            toast.success('Projeto excluído.');
        }
    };

    const handleExportProject = (project: ProjectSummary) => {
        const json = exportProjectById(project.id);
        if (!json) {
            toast.error('Não foi possível exportar o projeto.');
            return;
        }
        downloadJson(`${project.name.replace(/\s+/g, '-').toLowerCase()}.json`, json);
        toast.success('Projeto exportado.');
    };

    const handleExportAll = () => {
        downloadJson('timeline-projetos.json', exportAllProjects());
        toast.success('Todos os projetos exportados.');
    };

    const handleImport = async (file: File) => {
        try {
            const text = await file.text();
            const project = importProjectFromJson(text);
            loadProjects();
            toast.success(`Projeto "${project.name}" importado.`);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Falha ao importar projeto.');
        }
    };

    const sortedProjects = [...projects].sort((a, b) => {
        if (a.isDemo && !b.isDemo) return -1;
        if (!a.isDemo && b.isDemo) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-blue-50">
            <header className="border-b border-border bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-foreground">Meus projetos</h1>
                            <Link
                                to="/"
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                                    'gap-1 text-muted-foreground',
                                )}
                            >
                                <Home className="h-4 w-4" />
                                Início
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Dados salvos localmente no navegador ·{' '}
                            <Link
                                to={`/project/${DEMO_PROJECT_ID}`}
                                className="text-primary hover:underline"
                            >
                                Ver demo
                            </Link>
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={() => importInputRef.current?.click()}>
                            <Upload className="h-4 w-4" />
                            Importar
                        </Button>
                        <Button variant="outline" onClick={handleExportAll}>
                            <Download className="h-4 w-4" />
                            Exportar tudo
                        </Button>
                        <Button onClick={() => setModal('create')}>
                            <Plus className="h-4 w-4" />
                            Novo projeto
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
                {sortedProjects.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center">
                        <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
                        <Button variant="link" onClick={() => setModal('create')} className="mt-4">
                            Criar seu primeiro projeto
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onOpen={() => navigate(`/project/${project.id}`)}
                                onEdit={() => {
                                    setEditingProject(project);
                                    setModal('edit');
                                }}
                                onDelete={() => void handleDelete(project)}
                                onExport={() => handleExportProject(project)}
                            />
                        ))}
                    </div>
                )}
            </main>

            <PortfolioFooter />

            <input
                ref={importInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleImport(file);
                    e.target.value = '';
                }}
            />

            <ProjectModal
                title="Novo projeto"
                open={modal === 'create'}
                initial={emptyForm()}
                onClose={() => setModal(null)}
                onSubmit={handleCreate}
            />

            <ProjectModal
                title="Editar projeto"
                open={modal === 'edit' && editingProject !== null}
                initial={{
                    name: editingProject?.name ?? '',
                    description: editingProject?.description ?? '',
                }}
                onClose={() => {
                    setModal(null);
                    setEditingProject(null);
                }}
                onSubmit={handleEdit}
            />
        </div>
    );
};

export default DashboardPage;
