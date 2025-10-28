"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  BookOpen,
  CreditCard,
  FileText,
  Users,
  MessageCircle,
  ChevronRight,
  Home,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSearchParams } from "next/navigation"

type SearchResult = {
  id: string
  title: string
  category: string
  content: string
  views: number
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<SearchResult | null>(null)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [filteredArticles, setFilteredArticles] = useState<SearchResult[]>([])
  const [isLoadingCategory, setIsLoadingCategory] = useState(false)

  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category")

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      if (!selectedCategory) {
        setFilteredArticles([])
        return
      }

      setIsLoadingCategory(true)

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("help_articles")
          .select("id, title, category, content, views")
          .eq("category", selectedCategory)
          .order("views", { ascending: false })

        if (error) {
          console.error("[v0] Category fetch error:", error)
          setFilteredArticles([])
        } else {
          setFilteredArticles(data || [])
        }
      } catch (error) {
        console.error("[v0] Category fetch exception:", error)
        setFilteredArticles([])
      } finally {
        setIsLoadingCategory(false)
      }
    }

    fetchCategoryArticles()
  }, [selectedCategory])

  useEffect(() => {
    const searchArticles = async () => {
      if (searchQuery.trim().length === 0) {
        setSearchResults([])
        setShowResults(false)
        return
      }

      setIsSearching(true)
      setShowResults(true)

      try {
        const supabase = createClient()

        let query = supabase
          .from("help_articles")
          .select("id, title, category, content, views")
          .textSearch("search", searchQuery, {
            type: "plain",
            config: "english",
          })

        if (selectedCategory) {
          query = query.eq("category", selectedCategory)
        }

        const { data, error } = await query.order("views", { ascending: false }).limit(10)

        if (error) {
          console.error("[v0] Search error:", error)
          setSearchResults([])
        } else {
          setSearchResults(data || [])
        }
      } catch (error) {
        console.error("[v0] Search exception:", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    const timeoutId = setTimeout(searchArticles, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedCategory])

  const openArticle = async (article: SearchResult) => {
    setSelectedArticle(article)
    setShowArticleModal(true)

    try {
      const supabase = createClient()
      await supabase
        .from("help_articles")
        .update({ views: article.views + 1 })
        .eq("id", article.id)
    } catch (error) {
      console.error("[v0] Failed to increment views:", error)
    }
  }

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of Silly Nutrition",
      articles: 8,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      description: "Questions about pricing and payments",
      articles: 6,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: FileText,
      title: "Plans & Features",
      description: "Understanding your nutrition plans",
      articles: 12,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Users,
      title: "Account Management",
      description: "Managing your account settings",
      articles: 5,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const popularArticles = [
    { title: "How do I get started with my first plan?", views: 1234 },
    { title: "What's the difference between Standard and Advanced questionnaires?", views: 987 },
    { title: "Can I update my plan after purchase?", views: 856 },
    { title: "How do I cancel my subscription?", views: 743 },
    { title: "What payment methods do you accept?", views: 621 },
    { title: "How long does it take to receive my plan?", views: 589 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <SiteLogo size="md" />
              <span className="text-lg sm:text-xl font-bold">Silly Nutrition</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="gap-1 sm:gap-2 text-sm sm:text-base px-2 sm:px-4">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            How Can We Help You?
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
            {selectedCategory
              ? `Browsing ${selectedCategory} articles`
              : "Search our knowledge base or browse categories below"}
          </p>

          <div className="relative max-w-2xl mx-auto px-2 sm:px-0">
            <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-4 sm:py-6 text-base sm:text-lg rounded-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />

            {showResults && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                {isSearching ? (
                  <div className="p-6 sm:p-8 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-2"></div>
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="divide-y">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => openArticle(result)}
                        className="w-full p-3 sm:p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-start justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                {result.category}
                              </span>
                              <span className="text-xs text-gray-500">{result.views} views</span>
                            </div>
                            <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">{result.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {result.content.substring(0, 100)}...
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 sm:p-8 text-center">
                    <p className="text-sm sm:text-base text-gray-600 mb-2">No matching articles found.</p>
                    <p className="text-xs sm:text-sm text-gray-500">Try different keywords.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {selectedCategory && (
            <div className="mb-6 sm:mb-8 px-2 sm:px-0">
              <Link href="/help">
                <Button variant="outline" className="gap-1 sm:gap-2 bg-transparent text-sm sm:text-base">
                  <ArrowLeft className="h-4 w-4" />
                  Back to All Categories
                </Button>
              </Link>
            </div>
          )}

          {!selectedCategory && (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center px-2">
                Browse by Category
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 px-2 sm:px-0">
                {categories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <Link
                      key={index}
                      href={`/help?category=${encodeURIComponent(category.title)}`}
                      className="bg-white rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all group hover:border-orange-500 border-2 border-transparent block"
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors text-base sm:text-lg">
                        {category.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-500">{category.articles} articles</span>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}

          {selectedCategory && (
            <div className="mb-12 sm:mb-16 px-2 sm:px-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                {selectedCategory} Articles
              </h2>

              {isLoadingCategory ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                  <p className="text-sm sm:text-base text-gray-600">Loading articles...</p>
                </div>
              ) : filteredArticles.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-lg divide-y">
                  {filteredArticles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => openArticle(article)}
                      className="w-full p-4 sm:p-5 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex-1 text-left min-w-0 pr-2">
                        <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors text-sm sm:text-base">
                          {article.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">{article.views.toLocaleString()} views</p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
                          {article.content.substring(0, 150)}...
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-orange-600 transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                  <p className="text-sm sm:text-base text-gray-600 mb-2">No articles found in this category.</p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Try browsing other categories or use the search bar.
                  </p>
                </div>
              )}
            </div>
          )}

          {!selectedCategory && (
            <div className="max-w-4xl mx-auto px-2 sm:px-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                No Dumb Questions Here, Just Honest Answers
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 text-center px-2">
                Explore quick answers to the most common questions about your plan, subscriptions, and how Silly
                Nutrition works.
              </p>
              <div className="bg-white rounded-2xl shadow-lg divide-y">
                {popularArticles.map((article, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      openArticle({
                        id: "",
                        title: article.title,
                        category: "",
                        content: "",
                        views: article.views,
                      } as SearchResult)
                    }
                    className="w-full p-4 sm:p-5 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex-1 text-left min-w-0 pr-2">
                      <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors text-sm sm:text-base">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">{article.views.toLocaleString()} views</p>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-orange-600 transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 sm:mt-16 bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 sm:p-12 text-center mx-2 sm:mx-0">
            <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Still Need Help?</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2">
              Can't find what you're looking for? Our support team is here to help you with any questions.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 text-sm sm:text-base"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Dialog open={showArticleModal} onOpenChange={setShowArticleModal}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto mx-4">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-gray-500">{selectedArticle.views} views</span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl text-left">{selectedArticle.title}</DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap text-left">
                {selectedArticle.content}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
