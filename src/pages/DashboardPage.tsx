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
import TimelineThumbnail from '@/components/dashboard/TimelineThumbnail';
import type { ProjectSummary } from '@/types/project';
import { cn } from '@/lib/utils';
import { PORTFOLIO_TAGLINE } from '@/constants/portfolio';

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
        <Card className="group overflow-hidden border-border/80 py-0 shadow-[var(--chrome-shadow)] transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
            <button type="button" onClick={onOpen} className="block w-full text-left">
                {project.periodCount > 0 || project.eventCount > 0 ? (
                    <TimelineThumbnail
                        periods={project.previewPeriods}
                        events={project.previewEvents}
                    />
                ) : (
                    <div className="flex h-28 items-center justify-center bg-[oklch(0.955_0.01_210)] text-xs text-muted-foreground">
                        Timeline vazia — clique para começar
                    </div>
                )}
            </button>
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <CardTitle className="truncate font-heading text-lg tracking-tight">
                        {project.name}
                    </CardTitle>
                    {project.isDemo && (
                        <Badge
                            variant="secondary"
                            className="shrink-0 gap-1 bg-accent text-accent-foreground"
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

            <CardFooter className="gap-2 pb-4">
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

    const demoProjects = sortedProjects.filter((p) => p.isDemo);
    const userProjects = sortedProjects.filter((p) => !p.isDemo);

    return (
        <div className="flex min-h-screen flex-col bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,oklch(0.72_0.08_185/0.12),transparent),oklch(0.985_0.008_200)]">
            <header className="border-b border-border/80 bg-[var(--chrome)] backdrop-blur">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="font-heading text-3xl tracking-tight text-ink">
                                Meus projetos
                            </h1>
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
                            {PORTFOLIO_TAGLINE} ·{' '}
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
                {demoProjects.length > 0 && (
                    <section className="mb-10">
                        <div className="mb-4">
                            <h2 className="font-heading text-lg tracking-tight text-ink">
                                Vitrines
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Projetos de demonstração para explorar o canvas.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {demoProjects.map((project) => (
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
                    </section>
                )}

                <section>
                    <div className="mb-4">
                        <h2 className="font-heading text-lg tracking-tight text-ink">
                            Seus projetos
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Criados e salvos neste navegador.
                        </p>
                    </div>

                    {userProjects.length === 0 ? (
                        <div className="animate-fade-in flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 px-8 py-14 text-center">
                            <div className="mb-6 w-full max-w-sm overflow-hidden rounded-xl opacity-80">
                                <TimelineThumbnail
                                    periods={[
                                        {
                                            color: '#8ecae6',
                                            startYear: 1830,
                                            endYear: 1945,
                                            level: 1,
                                        },
                                        {
                                            color: '#219ebc',
                                            startYear: 1945,
                                            endYear: 1975,
                                            level: 2,
                                        },
                                        {
                                            color: '#ffb703',
                                            startYear: 1975,
                                            endYear: 1995,
                                            level: 1,
                                        },
                                        {
                                            color: '#fb8500',
                                            startYear: 1990,
                                            endYear: 2010,
                                            level: 3,
                                        },
                                    ]}
                                    events={[
                                        { color: '#023047', year: 1837 },
                                        { color: '#ffb703', year: 1977 },
                                        { color: '#e63946', year: 2007 },
                                    ]}
                                />
                            </div>
                            <h3 className="font-heading text-xl text-ink">
                                Comece sua primeira timeline
                            </h3>
                            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                                Crie um projeto em branco ou explore uma vitrine para ver períodos,
                                eventos e o canvas interativo em ação.
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <Button onClick={() => setModal('create')} className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Novo projeto
                                </Button>
                                <Link
                                    to={`/project/${DEMO_PROJECT_ID}`}
                                    className={buttonVariants({ variant: 'outline' })}
                                >
                                    Ver demo
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {userProjects.map((project) => (
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
                </section>
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
