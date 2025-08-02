"use client"

import { useState, useEffect } from "react"
import { Heart, Calendar, Camera, MessageCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function LoveWebsite() {
  const [currentSection, setCurrentSection] = useState("home")
  const [typedText, setTypedText] = useState("")
  const [showHearts, setShowHearts] = useState(false)
  const [daysTogether, setDaysTogether] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [easterEggFound, setEasterEggFound] = useState(false)

  // Quiz states
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showQuizResults, setShowQuizResults] = useState(false)
  const [score, setScore] = useState(0)

  const fullText = "This is a little corner of the internet just for you ❤️"

  // Calculate days together (customize this date!)
  useEffect(() => {
    const startDate = new Date("2023-03-25") // Change to your actual start date
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setDaysTogether(diffDays)
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (currentSection === "home") {
      let i = 0
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
          setShowHearts(true)
        }
      }, 100)
      return () => clearInterval(timer)
    }
  }, [currentSection])

  // Timeline data (customize with your own milestones!)
  const timeline = [
    {
      date: "September 5, 2023",
      title: "The Day We Met",
      description: "That moment in the car when we held each other hands and you were so shy",
      emoji: "😳",
    },
    {
      date: "September 5, 2023",
      title: "Our First Date",
      description: "The English tea house was the best moment of my life",
      emoji: "🌹",
    },
    {
      date: "March 25, 2026",
      title: "3 Year Anniversary",
      description: "This is an advance reminder for the day of our anniversary",
      emoji: "🎉",
    },
  ]

  // Photo gallery (replace with your actual photos)
  const photos = [
    { src: "/smile.jpg?height=300&width=400", caption: "You smiled here, and I fell a little more in love" },
    { src: "/laugh.jpg?height=300&width=400", caption: "Your laugh is my favorite sound" },
    { src: "/first meetup.jpg?height=300&width=400", caption: "Our first meetup together" },
    { src: "/meal.jpg?height=300&width=400", caption: "Every meal tastes better with you" },
    { src: "/hand in hand.jpg?height=300&width=400", caption: "Exploring the world, hand in hand" },
    { src: "/home.jpg?height=300&width=400", caption: "Home is wherever you are" },
  ]

  // Love notes
  const loveNotes = [
    {
      title: "Why I Love Your Smile",
      content:
        "Your smile is the best thing i've seen in my life. And the way you get shy while smiling is just so pure 🌸",
    },
    {
      title: "A Letter to Future You",
      content:
        "Dear Future Aisha, I hope you're reading this years from now, and it only remind you the good things, not the fights that we had. 🌸",
    },
    {
      title: "Random Tuesday Thoughts",
      content:
        "It's 4 PM on a Saturday and I'm thinking about how how bad i've treated you at times. But i just want you to know that you make ordinary moments extraordinary. 🌸",
    },
  ]

  // Quiz Questions (customize these!)
  const quizQuestions = [
    {
      question: "What was the first movie genre we watched together?",
      options: ["Romantic", "Horror", "Action", "Comedy"],
      answer: "Horror",
    },
    {
      question: "Where did we have our first date?",
      options: ["14th Street Pizza", "Shahjahan", "English Tea House", "Lit"],
      answer: "English Tea House",
    },
    {
      question: "What's my favorite thing you cook?",
      options: ["Pasta", "Pancakes", "Noodles", "Rice"],
      answer: "Pasta",
    },
  ]

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = value
    setUserAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    let correctCount = 0
    quizQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowQuizResults(true)
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setShowQuizResults(false)
    setScore(0)
  }

  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none z-10">
      {[...Array(6)].map((_, i) => (
        <Heart
          key={i}
          className={`absolute text-pink-400 animate-bounce opacity-70 ${showHearts ? "animate-pulse" : "opacity-0"}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
          size={20 + Math.random() * 20}
        />
      ))}
    </div>
  )

  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-pink-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center space-x-6">
          {[
            { id: "home", label: "Home", icon: Heart },
            { id: "story", label: "Our Story", icon: Calendar },
            { id: "gallery", label: "Memories", icon: Camera },
            { id: "notes", label: "Love Notes", icon: MessageCircle },
            { id: "games", label: "Fun", icon: Sparkles },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentSection(id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
                currentSection === id ? "bg-pink-100 text-pink-600" : "text-gray-600 hover:text-pink-500"
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )

  const HomeSection = () => (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
      <div className="text-center z-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
          To the love of my life,
          <span className="block text-pink-600 mt-2">Aisha ❤️</span>
        </h1>
        <div className="text-xl md:text-2xl text-gray-600 mb-8 h-16 flex items-center justify-center">
          <span className="border-r-2 border-pink-400 pr-1 animate-pulse">{typedText}</span>
        </div>
        <Button
          onClick={() => setCurrentSection("story")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
        >
          Start Our Journey ✨
        </Button>
      </div>
      <FloatingHearts />
    </section>
  )

  const StorySection = () => (
    <section className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Love Story</h2>
        <div className="max-w-4xl mx-auto">
          {timeline.map((event, index) => (
            <div key={index} className="flex items-center mb-12 group">
              <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-pink-200 transition-colors">
                {event.emoji}
              </div>
              <div className="ml-6 flex-grow">
                <div className="bg-white rounded-lg shadow-md p-6 group-hover:shadow-lg transition-shadow">
                  <div className="text-sm text-pink-600 font-semibold mb-2">{event.date}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Card className="inline-block p-6 bg-gradient-to-r from-pink-50 to-purple-50">
            <CardContent className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Days Together</h3>
              <div className="text-4xl font-bold text-pink-600">{daysTogether}</div>
              <p className="text-gray-600 mt-2">and counting... ❤️</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )

  const GallerySection = () => (
    <section className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Beautiful Memories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {photos.map((photo, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.caption}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="p-4 bg-white">
                    <p className="text-gray-600 italic text-sm">{photo.caption}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <img src={photo.src || "/placeholder.svg"} alt={photo.caption} className="w-full rounded-lg" />
                <p className="text-center text-gray-600 italic mt-4">{photo.caption}</p>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )

  const NotesSection = () => (
    <section className="min-h-screen py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Love Notes Just for You</h2>
        <div className="max-w-4xl mx-auto grid gap-8">
          {loveNotes.map((note, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all transform hover:scale-105">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-pink-600 transition-colors">
                  {note.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg font-serif italic">"{note.content}"</p>
                <div className="mt-4 text-right">
                  <span className="text-pink-600 font-semibold">With all my love ❤️</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )

  const GamesSection = () => (
    <section className="min-h-screen py-20 bg-gradient-to-br from-yellow-50 to-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">A Little Interactive Fun</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="group hover:shadow-xl transition-all transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <Sparkles className="mx-auto mb-4 text-pink-500" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Memory Quiz</h3>
              <p className="text-gray-600 mb-6">How well do you remember our adventures?</p>
              {!quizStarted && (
                <Button onClick={() => setQuizStarted(true)} className="bg-pink-500 hover:bg-pink-600 text-white">
                  Start Quiz ✨
                </Button>
              )}
              {quizStarted && !showQuizResults && (
                <div className="mt-6 text-left">
                  <h4 className="text-xl font-semibold mb-4">
                    Question {currentQuestionIndex + 1}/{quizQuestions.length}
                  </h4>
                  <p className="text-lg mb-4">{quizQuestions[currentQuestionIndex].question}</p>
                  <RadioGroup
                    onValueChange={handleAnswerSelect}
                    value={userAnswers[currentQuestionIndex] || ""}
                    className="space-y-2"
                  >
                    {quizQuestions[currentQuestionIndex].options.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${idx}`} />
                        <Label htmlFor={`option-${idx}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button
                    onClick={handleNextQuestion}
                    className="mt-6 bg-pink-500 hover:bg-pink-600 text-white"
                    disabled={!userAnswers[currentQuestionIndex]}
                  >
                    {currentQuestionIndex === quizQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
                  </Button>
                </div>
              )}
              {showQuizResults && (
                <div className="mt-6 text-center">
                  <h4 className="text-2xl font-bold mb-4">Quiz Results!</h4>
                  <p className="text-xl mb-4">
                    You got <span className="text-pink-600 font-bold">{score}</span> out of{" "}
                    <span className="text-gray-800 font-bold">{quizQuestions.length}</span> correct!
                  </p>
                  <div className="text-left mt-6 space-y-2">
                    {quizQuestions.map((q, index) => (
                      <div
                        key={index}
                        className="p-2 rounded-md"
                        style={{ backgroundColor: userAnswers[index] === q.answer ? "#dcfce7" : "#fee2e2" }}
                      >
                        <p className="font-semibold">{q.question}</p>
                        <p className="text-sm">
                          Your answer:{" "}
                          <span className={userAnswers[index] === q.answer ? "text-green-700" : "text-red-700"}>
                            {userAnswers[index] || "No answer"}
                          </span>
                        </p>
                        <p className="text-sm">
                          Correct answer: <span className="text-blue-700">{q.answer}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button onClick={resetQuiz} className="mt-6 bg-gray-500 hover:bg-gray-600 text-white">
                    Retake Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <Heart className="mx-auto mb-4 text-red-500" size={48} />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Easter Egg Hunt</h3>
              <p className="text-gray-600 mb-6">Find hidden messages throughout the site!</p>
              <Button onClick={() => setEasterEggFound(true)} className="bg-red-500 hover:bg-red-600 text-white">
                {easterEggFound ? "Found one! 🎉" : "Start Hunting 🔍"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {easterEggFound && (
          <div className="mt-8 text-center">
            <Card className="inline-block bg-gradient-to-r from-pink-100 to-purple-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Secret Message Found! 🎉</h3>
                <p className="text-gray-600 italic">"You found me! Just like how you found your way into my heart ❤️"</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )

  const ClosingSection = () => (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 relative">
      <div className="text-center z-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">Thank You for Being My Everything</h2>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-xl">
          <p className="text-xl text-gray-700 leading-relaxed mb-6 font-serif italic">
            "I made this little corner of the internet to remind you how deeply you are loved, and
            will always be loved. You are my comfort, my safest place, and my most beautiful dream."
          </p>
          <div className="flex justify-center items-center space-x-2 text-2xl">
            <Heart className="text-red-500 animate-pulse" />
            <span className="font-bold text-gray-800">Forever yours</span>
            <Heart className="text-red-500 animate-pulse" />
          </div>
        </div>
      </div>
      <FloatingHearts />
    </section>
  )

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        {currentSection === "home" && <HomeSection />}
        {currentSection === "story" && <StorySection />}
        {currentSection === "gallery" && <GallerySection />}
        {currentSection === "notes" && <NotesSection />}
        {currentSection === "games" && <GamesSection />}
        {currentSection === "home" && <ClosingSection />}
      </div>

      {/* Hidden Easter Egg - Press 'L' for love */}
      <div
        className="fixed bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => alert("💕 You found a secret! You make my heart skip a beat every single day 💕")}
      >
        <Heart className="text-pink-500 animate-bounce" size={24} />
      </div>
    </div>
  )
}
