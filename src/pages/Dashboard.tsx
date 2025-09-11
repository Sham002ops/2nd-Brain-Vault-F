import React, { useEffect, useState } from 'react'
import Button from '../components/UI/Button'
import { PlusIcon } from '../icons/plusIcon'
import Sidebar from '../components/UI/Sidebar'
import { useContent } from '../components/hooks/useContent'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import CreateContent from '../components/UI/CreateContent'

const ViewPost = React.lazy(() => import('../components/UI/ViewPost'));
const Card = React.lazy(() => import('../components/UI/Card'))

export function Dashboard({searchQuery, setSearchQuery}) {
  const [modalOpen, setModalOpen]= useState(false);
  const [viewmodalOpen, setViewModalOpen]= useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // for responsive Sidebar

  const {contents = [], refresh }: { contents: Array<{ _id: string, type: "twitter" | "youtube" | "instagram" | "facebook" | "pinterest" | "doc", tags: string[], link: string, title: string, description: string }>, refresh: () => void } = useContent();
  
  const handleDelete = (id: string) => {
    contents.filter((content) => content._id !== id);
    refresh();
  }

  const handleOpen = (id: string) => {
    setSelectedContentId(id);
    setViewModalOpen(true);
  };

  useEffect(()=>{
    refresh()
  }, [modalOpen,viewmodalOpen, refresh])

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      {/* Sidebar: drawer on mobile/tablet, fixed on desktop */}
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Content wrapper: remove fixed margin on small screens, keep on desktop */}
      <div className="lg:ml-72 lg:pl-3">
        {/* Header with hamburger toggle (Header already supports onMenu in prior step) */}
        <Header onMenu={() => setMenuOpen(true)} />

        {/* Search */}
        <div className="px-3 sm:px-4 md:px-6">
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>

        {contents.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-white h-[calc(100vh-150px)]">
            <CreateContent
              open={modalOpen}
              onClose={() => {
                setModalOpen(false);
              }}
            />

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 mt-2 lg:-mt-10 text-center">
              Welcome to 2nd Brain Vault
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-8 sm:mb-10 text-center text-gray-300 max-w-2xl">
              Get started by adding the first piece of content. This dashboard keeps everything organized in one place.
            </p>

            <div className="rounded-xl border border-violet-700/60 shadow-lg shadow-violet-700/30 bg-violet-600/10">
              <Button
                onClick={() => {
                  setModalOpen(true);
                }}
                transition="2"
                startIcon={<PlusIcon size="md" />}
                size="lg"
                variant="primary"
                text="Add Content"
              />
            </div>
          </div>
        ) : (
          <div className="px-3 sm:px-4 md:px-6">
            <div>
              {
                <ViewPost
                  open={viewmodalOpen}
                  onClose={() => {
                    setViewModalOpen(false);
                  }}
                  selectedContentId={selectedContentId || ''}
                />
              }
            </div>

            <div>
              <div
                id="cards"
                className="
                  flex flex-wrap
                  gap-4 sm:gap-5 md:gap-8 lg:gap-10
                  pt-4 sm:pt-5 md:pt-6
                "
              >
                {contents
                  .filter((content) =>
                    content.tags.some((tag) => tag.includes(searchQuery.toLowerCase()))
                  )
                  .map(({ _id, type, tags, link, title, description }) => (
                    <Card
                      key={_id}
                      _id={_id}
                      tags={tags}
                      type={type}
                      link={link}
                      title={title}
                      description={type === 'doc' ? description : undefined}
                      onOpen={() => handleOpen(_id)}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
