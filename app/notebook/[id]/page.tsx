export default async function NotebookPage({ params }: { params: Promise<{ id: string }> }) {
    const paramsData = await params;
    
    return (
        <div>
            <h1>Notebook article {paramsData.id}</h1>
        </div>
    )
}