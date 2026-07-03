const PagesLoading = () => {
  return (
    <section className='bg-background min-h-screen px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl space-y-6'>
        <div className='bg-muted h-8 w-48 animate-pulse rounded-md' />
        <div className='bg-muted h-10 w-full max-w-xl animate-pulse rounded-md' />
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='bg-muted h-72 animate-pulse rounded-md' />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PagesLoading
