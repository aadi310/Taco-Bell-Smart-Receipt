"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  History,
  Instagram,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Star,
  User2,
  ThumbsUp,
  Share2,
  Facebook,
  Sparkles,
  MapPin,
  ShoppingBagIcon,
  Utensils,
  Receipt as ReceiptIcon,
} from "lucide-react"

interface Receipt {
  id: string
  date: string
  time: string
  associate: string
  items: Array<{
    id: number
    name: string
    description: string
    price: number
    quantity: number
    category?: string
    taxApplicable?: boolean
    baseAmount?: number
    tax?: number
    itemCode?: string
    size?: string
    color?: string
    material?: string
  }>
  subtotal: number
  tax: number
  total: number
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showTerms, setShowTerms] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [expandedProducts, setExpandedProducts] = useState<number[]>([])
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: string[] }>({})
  const [currentReceiptId, setCurrentReceiptId] = useState("current")
  const [showTransactionHistory, setShowTransactionHistory] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [showReferModal, setShowReferModal] = useState(false)
  const [showStoreLocation, setShowStoreLocation] = useState(false)
  const receiptContainerRef = useRef<HTMLDivElement>(null)
const [selectedTags, setSelectedTags] = useState<string[]>([])
const [couponToast, setCouponToast] = useState(false)
  const [itemFeedback, setItemFeedback] = useState({})
const [expandedItemFeedback, setExpandedItemFeedback] = useState([])
  const [feedback, setFeedback] = useState({
    service: 0,
    quality: 0,
    style: 0,
    pricing: 0,
    store: 0,
    comments: "",
  })
  const [profile, setProfile] = useState({
    mobile: "",
    name: "",
    email: "",
    gender: "",
  })
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedbackText, setFeedbackText] = useState("")

  const copyCoupon = (code: string) => {
  navigator.clipboard.writeText(code)

  setCouponToast(true)

  setTimeout(() => {
    setCouponToast(false)
  }, 2000)
}

  const toggleItemFeedback = (id) => {
  setExpandedItemFeedback((prev) =>
    prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  )
}

  const setItemRating = (itemId, rating) => {
  setItemFeedback((prev) => ({
    ...prev,
    [itemId]: {
      ...prev[itemId],
      rating,
    },
  }))
}

  const toggleItemTag = (itemId, tag) => {
  setItemFeedback((prev) => {
    const currentTags = prev[itemId]?.tags || []

    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag]

    return {
      ...prev,
      [itemId]: {
        ...prev[itemId],
        tags: newTags,
      },
    }
  })
}

  const customerName = "Rahul"

  // Carousel refs and APIs
  const [promoApi, setPromoApi] = useState<CarouselApi>()
  const feedbackButtonRef = useRef<HTMLButtonElement>(null)
  const historyButtonRef = useRef<HTMLButtonElement>(null)
  const referButtonRef = useRef<HTMLButtonElement>(null)

  // Auto-play effect for promo carousel
  useEffect(() => {
    if (!promoApi) return
    const interval = setInterval(() => {
      promoApi.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [promoApi])

  useEffect(() => {
  setItemFeedback({})
  setExpandedItemFeedback([])
}, [currentReceiptId])

  // Simple auto-height for WordPress iframe
  useEffect(() => {
    const postHeight = () => {
      const marker = document.getElementById("height-marker")
      if (marker && window.parent) {
        const rect = marker.getBoundingClientRect()
        const newHeight = Math.ceil(rect.top + rect.height + window.scrollY)
        window.parent.postMessage({ frameHeight: newHeight }, "*")
      }
    }

    // Run on load
    postHeight()

    // Observe changes to the DOM
    const ro = new ResizeObserver(postHeight)
    ro.observe(document.body)

    // Re-run on resize
    window.addEventListener("resize", postHeight)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", postHeight)
    }
  }, [])

  // Update current slide when carousel changes
  useEffect(() => {
    if (!promoApi) return
    promoApi.on("select", () => {
      setCurrentSlide(promoApi.selectedScrollSnap())
    })
  }, [promoApi])

 const receipts = {
  current: {
    id: "DMBLR7891XQ12",
    date: "05-03-2026",
    time: "19:22:18",
    associate: "Rahul Kumar",
    branch: "Brigade Road",
    items: [
      {
        id: 0,
        name: "Farmhouse Pizza",
        size: "Medium",
        description:
          "Loaded with capsicum, onion, tomato, grilled mushroom & mozzarella cheese",
        price: 399,
        quantity: 1,
        category: "Veg Pizza",
        taxApplicable: true,
        baseAmount: 380,
        tax: 19,
        itemCode: "P101",
        type: "Veg",
      },
      {
        id: 1,
        name: "Garlic Breadsticks",
        size: "Regular",
        description:
          "Freshly baked breadsticks with garlic seasoning and cheese dip",
        price: 149,
        quantity: 1,
        category: "Sides",
        taxApplicable: true,
        baseAmount: 142,
        tax: 7,
        itemCode: "S210",
      },
      {
        id: 2,
        name: "Choco Lava Cake",
        size: "Single",
        description:
          "Warm chocolate cake with molten chocolate filling inside",
        price: 109,
        quantity: 1,
        category: "Desserts",
        taxApplicable: true,
        baseAmount: 104,
        tax: 5,
        itemCode: "D330",
      },
    ],
    subtotal: 626,
    tax: 31,
    total: 657,
  },

  hist1: {
    id: "DMBLR6719YT92",
    date: "20-01-2026",
    time: "14:22:18",
    associate: "Anita Sharma",
    branch: "Indiranagar",
    items: [
      {
        id: 0,
        name: "Chicken Dominator",
        size: "Medium",
        description:
          "Loaded with double pepper barbecue chicken, peri-peri chicken & grilled chicken rashers",
        price: 549,
        quantity: 1,
        category: "Non-Veg Pizza",
        taxApplicable: true,
        baseAmount: 523,
        tax: 26,
        itemCode: "P210",
        type: "Chicken",
      },
      {
        id: 1,
        name: "Stuffed Garlic Bread",
        size: "Regular",
        description:
          "Freshly baked bread stuffed with mozzarella cheese and jalapenos",
        price: 169,
        quantity: 1,
        category: "Sides",
        taxApplicable: true,
        baseAmount: 161,
        tax: 8,
        itemCode: "S230",
      },
      {
        id: 2,
        name: "Pepsi",
        size: "500ml",
        description: "Chilled Pepsi soft drink",
        price: 60,
        quantity: 1,
        category: "Beverages",
        taxApplicable: true,
        baseAmount: 57,
        tax: 3,
        itemCode: "B310",
      },
    ],
    subtotal: 741,
    tax: 37,
    total: 778,
  },

  hist2: {
    id: "DMBLR5590LP33",
    date: "15-12-2025",
    time: "12:45:33",
    associate: "Sanjay Reddy",
    branch: "Koramangala",
    items: [
      {
        id: 0,
        name: "Veg Extravaganza",
        size: "Medium",
        description:
          "Black olives, capsicum, onion, grilled mushroom, corn, tomato & jalapeno",
        price: 429,
        quantity: 1,
        category: "Veg Pizza",
        taxApplicable: true,
        baseAmount: 409,
        tax: 20,
        itemCode: "P140",
        type: "Veg",
      },
      {
        id: 1,
        name: "Taco Mexicana",
        size: "Regular",
        description:
          "Mexican herbs with jalapenos, onions, tomatoes and taco seasoning",
        price: 279,
        quantity: 1,
        category: "Veg Pizza",
        taxApplicable: true,
        baseAmount: 266,
        tax: 13,
        itemCode: "P150",
        type: "Veg",
      },
      {
        id: 2,
        name: "Butterscotch Mousse Cake",
        size: "Single",
        description:
          "Soft butterscotch flavored mousse dessert with caramel topping",
        price: 119,
        quantity: 1,
        category: "Desserts",
        taxApplicable: true,
        baseAmount: 113,
        tax: 6,
        itemCode: "D310",
      },
    ],
    subtotal: 788,
    tax: 39,
    total: 827,
  },
};
  
  const currentReceipt = receipts[currentReceiptId]

  const totalSlides = 2

  const transactionHistory = [
    {
      id: "current",
      date: "05-03-2026",
      branch: "Domino's",
      amount: currentReceiptId === "current" ? receipts.current.subtotal + receipts.current.tax : 657.00,
    },
    { id: "hist1", date: "20-01-2026", branch: "Domino's", amount: 778.00 },
    { id: "hist2", date: "15-12-2025", branch: "Domino's", amount: 827.00 },
  ]

  const toggleProductExpansion = (productId: number) => {
    setExpandedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleProfileUpdate = () => {
    setProfileUpdateSuccess(true)
    setTimeout(() => setProfileUpdateSuccess(false), 3000)
  }

  const getModalPositionRelativeToContainer = (buttonRef: React.RefObject<HTMLButtonElement>) => {
    if (!buttonRef.current || !receiptContainerRef.current) {
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
    }

    const button = buttonRef.current
    const container = receiptContainerRef.current

    const buttonRect = button.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    // Calculate position relative to container
    const relativeTop = buttonRect.top - containerRect.top
    const relativeLeft = buttonRect.left - containerRect.left

    // Modal dimensions (approximate)
    const modalWidth = Math.min(400, containerRect.width - 32)
    const modalHeight = 400

    // Calculate ideal top position (above button, with offset)
    let top = Math.max(16, relativeTop - modalHeight - 8)

    // If modal would go off top, place it below button
    if (top < 16) {
      top = relativeTop + buttonRect.height + 8
    }

    // If still too high, center it vertically
    if (top + modalHeight > containerRect.height) {
      top = Math.max(16, (containerRect.height - modalHeight) / 2)
    }

    // Calculate ideal left position (centered on button)
    let left = relativeLeft + buttonRect.width / 2 - modalWidth / 2

    // Keep modal within horizontal bounds
    left = Math.max(16, Math.min(left, containerRect.width - modalWidth - 16))

    return {
      position: "absolute" as const,
      top: `${top}px`,
      left: `${left}px`,
      width: `${modalWidth}px`,
      maxHeight: "85vh",
    }
  }

  const handleFeedbackModalOpen = () => {
    setShowFeedbackModal(true)
  }

  const handleTransactionHistoryOpen = () => {
    setShowTransactionHistory(true)
  }

  const handleReferModalOpen = () => {
    setShowReferModal(true)
  }

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true)
    setShowFeedbackModal(false)
    setTimeout(() => setFeedbackSubmitted(false), 5000)
  }

  const handleShare = () => {
    handleReferModalOpen()
  }

  const handleEmailReceipt = () => {
    window.open(`mailto:?subject=Receipt from Domino's Bangalore&body=Receipt ID: ${currentReceipt.id}`)
  }

  const handleDownloadReceipt = () => {
    const receiptContent = `
  <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Domino's Digital Receipt</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
font-family:'Poppins',sans-serif;
font-size:14px;
color:#111;
background:#fff;
width:800px;
margin:0 auto;
padding:24px;
}

/* Header */

.receipt-header{
display:flex;
justify-content:space-between;
align-items:flex-start;
margin-bottom:28px;
padding-bottom:16px;
border-bottom:3px solid #006491;
}

.company-info h1{
font-size:30px;
color:#006491;
font-weight:700;
margin-bottom:4px;
}

.company-info p{
font-size:12px;
color:#555;
line-height:1.4;
}

.bill-info{
text-align:right;
font-size:12px;
}

.bill-info div{
margin-bottom:4px;
}

.bill-id{
font-weight:600;
color:#E31837;
}

/* Guest section */

.customer-section{
background:#F4F8FB;
padding:14px;
border-left:4px solid #006491;
border-radius:0 8px 8px 0;
margin-bottom:22px;
}

.customer-section h3{
font-size:15px;
color:#006491;
font-weight:600;
margin-bottom:2px;
}

.customer-section p{
font-size:12px;
color:#666;
}

/* Table */

.items-table{
width:100%;
border-collapse:collapse;
margin-bottom:24px;
}

.items-table th{
background:#006491;
color:white;
padding:10px 8px;
text-align:left;
font-size:11px;
text-transform:uppercase;
letter-spacing:0.5px;
}

.items-table td{
padding:12px 8px;
border-bottom:1px solid #eee;
font-size:12px;
vertical-align:top;
}

.item-name{
font-weight:600;
margin-bottom:3px;
}

.item-desc{
font-size:11px;
color:#666;
}

.item-specs{
font-size:10px;
color:#E31837;
margin-top:4px;
font-weight:600;
}

/* Totals */

.totals-section{
display:flex;
justify-content:space-between;
margin-bottom:20px;
}

.items-count{
font-weight:600;
}

.totals-table{
text-align:right;
min-width:200px;
}

.totals-table div{
margin-bottom:6px;
font-size:13px;
}

.net-total{
font-size:18px;
font-weight:700;
color:#006491;
border-top:2px solid #006491;
padding-top:6px;
margin-top:6px;
}

/* Footer */

.footer{
text-align:center;
margin-top:30px;
padding-top:20px;
border-top:1px dashed #ccc;
font-size:12px;
color:#555;
}

.footer strong{
color:#E31837;
}

.powered{
margin-top:10px;
font-size:10px;
color:#999;
font-weight:600;
}

@media print{
body{
-webkit-print-color-adjust:exact;
width:100%;
padding:0;
}
}

</style>
</head>

<body>

<div class="receipt-header">

<div class="company-info">
<h1>Domino's</h1>
<p>
<strong>Domino's Pizza India</strong><br>
Brigade Road<br>
Bengaluru, Karnataka 560001<br>
Phone: 1800-208-1234
</p>
</div>

<div class="bill-info">
<div><strong>Order ID:</strong> <span class="bill-id">DMBLR7891XQ12</span></div>
<div><strong>Date:</strong> 05-03-2026 19:22</div>
<div><strong>Store Associate:</strong> Rahul Kumar</div>
</div>

</div>

<div class="customer-section">
<h3>Customer: ${customerName}</h3>
<p>Thank you for ordering with Domino's!</p>
</div>

<table class="items-table">

<thead>
<tr>
<th style="width:50%">Menu Item</th>
<th style="width:10%">Qty</th>
<th style="width:15%">Size</th>
<th style="width:12%">Price</th>
<th style="width:13%">Total</th>
</tr>
</thead>

<tbody>

<tr>
<td>
<div class="item-name">Farmhouse Pizza</div>
<div class="item-desc">Capsicum, onion, tomato, grilled mushroom & mozzarella cheese</div>
<div class="item-specs">Type: Veg Pizza</div>
</td>
<td>1</td>
<td>Medium</td>
<td>₹399</td>
<td><strong>₹399</strong></td>
</tr>

<tr>
<td>
<div class="item-name">Garlic Breadsticks</div>
<div class="item-desc">Freshly baked breadsticks with garlic seasoning & cheese dip</div>
<div class="item-specs">Side</div>
</td>
<td>1</td>
<td>Regular</td>
<td>₹149</td>
<td><strong>₹149</strong></td>
</tr>

<tr>
<td>
<div class="item-name">Choco Lava Cake</div>
<div class="item-desc">Warm chocolate cake with molten chocolate filling</div>
<div class="item-specs">Dessert</div>
</td>
<td>1</td>
<td>Single</td>
<td>₹109</td>
<td><strong>₹109</strong></td>
</tr>

</tbody>
</table>

<div class="totals-section">

<div class="items-count">
Items Ordered: 3
</div>

<div class="totals-table">
<div>Subtotal: <strong>₹626</strong></div>
<div>GST (5%): <strong>₹31</strong></div>
<div class="net-total">Total: <strong>₹657</strong></div>
</div>

</div>

<div class="footer">

<p><strong>Thanks for choosing Domino's!</strong></p>
<p>Order again at www.dominos.co.in</p>

<div class="powered">
Powered by RDEP
</div>

</div>

</body>
</html>
    `

    const blob = new Blob([receiptContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "Dominos_Receipt_SK251107001.html"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleWhatsApp = () => {
    window.open("https://wa.me/+919620921294", "_blank")
  }

  const handleCall = () => {
    window.open("tel:+919620921294", "_blank")
  }

  const handleEmail = () => {
    window.open("mailto:sagar.p@proenx.com", "_blank")
  }

  const handleSocialLink = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div
        id="receipt-root"
        ref={receiptContainerRef}
        className="w-full max-w-md mx-auto bg-white shadow-lg relative overflow-hidden"
      >
        <div className="flex flex-col w-full gap-3 pb-4 px-3">

          {/* Top Section */}
<div className="bg-white rounded-2xl shadow-md border border-gray-200 mt-4 mx-3 overflow-hidden">
  {/* Header */}
  <div className="bg-[#006491] px-5 pt-5 pb-6 text-white">
    <div className="flex items-start justify-between">
      {/* Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/74/Dominos_pizza_logo.svg"
        alt="Domino's Pizza"
        className="h-20 w-auto"
      />
      {/* QR */}
      <div className="bg-white rounded-xl p-2 shadow-sm">
        <Image
          src="/images/design-mode/800px-QR_code_for_mobile_English_Wikipedia.svg.png"
          alt="QR Code"
          width={52}
          height={52}
        />
      </div>
    </div>
    {/* Greeting */}
    <div className="mt-3">
      <div className="text-lg font-semibold">
        Thanks {customerName}
      </div>
      <div className="text-sm opacity-90">
        Your Domino's order is confirmed
      </div>
    </div>
    {/* Amount */}
    <div className="mt-4 bg-[#E31837] rounded-xl p-4 flex justify-between items-center">
      <div>
        <div className="text-xs opacity-80">
          Amount Paid
        </div>
        <div className="text-3xl font-semibold">
          ₹{currentReceipt.total.toFixed(2)}
        </div>
      </div>
      <User2 className="h-7 w-7 text-white/80" />
    </div>
  </div>
  {/* Receipt Metadata */}
  <div className="p-4 bg-white">
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 space-y-2">
      {/* Receipt ID */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Order ID:
        </span>
        <span className="text-sm font-semibold tracking-wide text-right">
          {currentReceipt.id}
        </span>
      </div>
      {/* Date & Time */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Order Time:
        </span>
        <span className="text-sm font-semibold text-right">
          {currentReceipt.date} {currentReceipt.time}
        </span>
      </div>
    </div>
  </div>
</div>
          
          {/* Purchase Details */}
<div className="bg-white rounded-2xl shadow-md border border-gray-200 mt-4 mx-3 p-4">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold flex items-center text-[#006491]">
      <Utensils className="mr-2 h-5 w-5" />
      Your Order
    </h3>

    <span className="text-xs font-medium border border-[#006491] text-[#006491] px-2 py-1 rounded-full">
      {currentReceipt.items.length} items
    </span>
  </div>


  {/* Items */}
  <div className="space-y-3">

    {currentReceipt.items.map((product) => (

      <div
        key={product.id}
        className="bg-[#F4F8FB] rounded-xl p-3 border border-[#DDEAF2]"
      >

        {/* Item Header */}
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleProductExpansion(product.id)}
        >

          <div className="flex items-center flex-1">

            <ChevronRight
              className={`h-4 w-4 mr-2 text-[#006491] transition-transform duration-200 ${
                expandedProducts.includes(product.id) ? "rotate-90" : ""
              }`}
            />

            <div>
              <div className="font-medium text-sm text-gray-900">
                {product.name}
              </div>

              <div className="text-xs text-gray-500">
                {product.category}
              </div>
            </div>

          </div>


          <div className="text-right">

            <div className="text-xs text-gray-500">
              Qty {product.quantity}
            </div>

            <div className="font-semibold text-sm text-[#006491]">
              ₹{(product.price * product.quantity).toFixed(2)}
            </div>

          </div>

        </div>


        {/* Expanded Product Info */}
        {expandedProducts.includes(product.id) && (

          <div className="mt-3 pt-3 border-t border-[#DDEAF2] text-xs text-gray-600 grid grid-cols-2 gap-y-1">

            <div>Item Code: {product.itemCode}</div>
            <div>Size: {product.size}</div>
            <div>Base: ₹{product.baseAmount?.toFixed(2)}</div>
            <div>Tax: ₹{product.tax?.toFixed(2)}</div>

          </div>

        )}


        {/* Item Feedback Toggle */}
        <div className="mt-3">

          <button
            onClick={() => toggleItemFeedback(product.id)}
            className="text-xs text-[#E31837] font-medium"
          >
            {expandedItemFeedback.includes(product.id)
              ? "Hide item feedback"
              : "Rate this item"}
          </button>

        </div>


        {/* Item Feedback Panel */}
        {expandedItemFeedback.includes(product.id) && (

          <div className="mt-3 bg-white border border-gray-200 rounded-xl p-3">

            {/* Rating */}
            <div className="flex justify-center gap-2 mb-3">

              {[1,2,3,4,5].map((star) => (

                <button
                  key={star}
                  onClick={() => setItemRating(product.id, star)}
                >

                  <Star
                    className={`h-5 w-5 ${
                      star <= (itemFeedback[product.id]?.rating || 0)
                        ? "fill-[#E31837] text-[#E31837]"
                        : "text-gray-300"
                    }`}
                  />

                </button>

              ))}

            </div>


            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center">

              {["Taste","Freshness","Portion","Temperature"].map((tag) => {

                const active =
                  itemFeedback[product.id]?.tags?.includes(tag)

                return (

                  <button
                    key={tag}
                    onClick={() => toggleItemTag(product.id, tag)}
                    className={`text-[11px] px-2 py-1 rounded-full border ${
                      active
                        ? "bg-[#E31837] text-white border-[#E31837]"
                        : "border-gray-200"
                    }`}
                  >
                    {tag}
                  </button>

                )

              })}

            </div>

          </div>

        )}

      </div>

    ))}

  </div>


  {/* Totals */}
  <div className="mt-5 pt-4 border-t border-gray-200 space-y-2 text-sm">

    <div className="flex justify-between">
      <span className="text-gray-600">Subtotal</span>
      <span>₹{currentReceipt.subtotal.toFixed(2)}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-600">Tax</span>
      <span>₹{currentReceipt.tax.toFixed(2)}</span>
    </div>

    <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
      <span>Total Paid</span>
      <span className="text-[#006491]">
        ₹{currentReceipt.total.toFixed(2)}
      </span>
    </div>

  </div>


  {/* Payment */}
  <div className="mt-5">

    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-between">

      <div className="flex items-center">

        <div className="w-8 h-8 bg-[#006491] rounded-lg flex items-center justify-center mr-3">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </div>

        <div>
          <div className="text-xs font-medium">
            Card Payment
          </div>

          <div className="text-xs text-gray-500">
            **** **** **** 4532
          </div>
        </div>

      </div>

      <div className="text-sm font-semibold text-[#006491]">
        ₹{currentReceipt.total.toFixed(2)}
      </div>

    </div>

  </div>

</div>

      {/* Rewards Loyalty Section */}
<div className="bg-white rounded-2xl shadow-md border border-gray-200 mt-4 mx-3 overflow-hidden">

  {/* Banner */}
  <div className="relative">
    <img
      src="https://www.dominos.co.in/blog/wp-content/uploads/2022/07/dominos-cheesy-rewards-loyalty-program.jpg"
      alt="Domino's Rewards"
      className="w-full h-36 object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

    <div className="absolute bottom-4 left-4 right-4 text-white">
      <div className="text-lg font-semibold leading-tight">
        Domino's Rewards
      </div>

      <div className="text-xs opacity-90">
        Earn slices with every order and unlock free pizza
      </div>
    </div>
  </div>


  <div className="p-4">

    {/* Overview */}
    <div className="grid grid-cols-3 gap-3 mb-4">

      <div className="bg-[#F4F8FB] rounded-xl p-3 text-center border border-[#DDEAF2]">
        <div className="text-lg font-semibold text-[#006491]">+2</div>
        <div className="text-xs text-gray-600">Slices Earned</div>
      </div>

      <div className="bg-[#F4F8FB] rounded-xl p-3 text-center border border-[#DDEAF2]">
        <div className="text-lg font-semibold text-[#006491]">6</div>
        <div className="text-xs text-gray-600">Total Slices</div>
      </div>

      <div className="bg-[#F4F8FB] rounded-xl p-3 text-center border border-[#DDEAF2]">
        <div className="text-lg font-semibold text-[#006491]">Free Pizza</div>
        <div className="text-xs text-gray-600">Next Reward</div>
      </div>

    </div>


    {/* Progress */}
    <div className="bg-[#F4F8FB] rounded-xl p-4 border border-[#DDEAF2]">

      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span>Reward Progress</span>
        <span>6 / 10 slices</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#E31837] rounded-full"
          style={{ width: "60%" }}
        />
      </div>

      <div className="text-xs text-gray-600 mt-2">
        Only <span className="font-semibold text-[#E31837]">4 slices</span> away from your free pizza reward.
      </div>

    </div>


    {/* Reward Journey */}
    <div className="mt-4">

      <div className="text-sm font-semibold text-gray-900 mb-2">
        Your Reward Journey
      </div>

      <div className="flex items-center justify-between text-center text-xs">

        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[#006491] text-white flex items-center justify-center">✓</div>
          <div className="mt-1">Garlic Bread</div>
        </div>

        <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>

        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[#006491] text-white flex items-center justify-center">✓</div>
          <div className="mt-1">Choco Lava</div>
        </div>

        <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>

        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#E31837] text-[#E31837] flex items-center justify-center">🍕</div>
          <div className="mt-1">Free Pizza</div>
        </div>

      </div>

    </div>


    {/* CTA */}
    <div className="mt-4">
      <a
        href="https://pizzaonline.dominos.co.in"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-[#006491] text-white rounded-xl py-2 text-sm font-medium hover:opacity-90 transition"
      >
        View Domino's Rewards
      </a>
    </div>

  </div>

</div>
          
{/* Promo Banner Carousel */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden mx-3 mt-4 relative font-poppins">
  <Carousel
    className="w-full"
    setApi={setPromoApi}
    opts={{
      loop: true,
    }}
  >
    <CarouselContent>

      {/* Banner 1 */}
      <CarouselItem>
        <div className="relative w-full aspect-[2/1] bg-[#F4F8FB] flex items-center justify-center">

          <a
            href="https://www.dominos.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full relative"
          >
            <Image
              src="https://api.dominos.co.in/prod-olo-api/images/Home_Paytm_20210519.jpg"
              alt="Domino's Paytm Offer"
              fill
              className="object-contain"
              priority
            />
          </a>

          {/* CTA */}
          <a
            href="https://www.dominos.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4"
          >
            <button className="bg-[#E31837] text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm">
              Order Now
            </button>
          </a>

        </div>
      </CarouselItem>


      {/* Banner 2 */}
      <CarouselItem>
        <div className="relative w-full aspect-[2/1] bg-[#F4F8FB] flex items-center justify-center">

          <a
            href="https://www.dominos.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full relative"
          >
            <Image
              src="https://api.dominos.co.in/prod-olo-api/images/amazon_home_20210412.jpg"
              alt="Domino's Amazon Offer"
              fill
              className="object-contain"
            />
          </a>

          {/* CTA */}
          <a
            href="https://www.dominos.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4"
          >
            <button className="bg-[#E31837] text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm">
              Order Now
            </button>
          </a>

        </div>
      </CarouselItem>


      {/* Banner 3 */}
      <CarouselItem>
        <div className="relative w-full aspect-[2/1] bg-[#F4F8FB] flex items-center justify-center">

          <a
            href="https://www.dominos.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full relative"
          >
            <Image
              src="https://api.dominos.co.in/prod-olo-api/images/Home_Freecharge_20210405.jpg"
              alt="Domino's Freecharge Offer"
              fill
              className="object-contain"
            />
          </a>

          {/* CTA */}
          <a
            href="https://www.dominos.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4"
          >
            <button className="bg-[#E31837] text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm">
              Order Now
            </button>
          </a>

        </div>
      </CarouselItem>

    </CarouselContent>


    {/* Pagination Dots */}
    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          onClick={() => promoApi?.scrollTo(index)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            currentSlide === index
              ? "w-5 bg-[#E31837]"
              : "w-1.5 bg-white/70"
          }`}
        />
      ))}
    </div>

  </Carousel>
</div>

          {/* Join Domino's Rewards Section */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md mx-3 mt-4 p-4 font-poppins">

  {profileUpdateSuccess ? (

    <div className="text-center py-4 bg-green-50 rounded-xl border border-green-100">

      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <div className="text-sm font-semibold text-gray-900 mb-1">
        Welcome to Domino's Rewards!
      </div>

      <div className="text-xs text-green-700 font-medium">
        Your profile has been saved and rewards are now active.
      </div>

    </div>

  ) : (

    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center">

          <div className="bg-[#E31837] p-2 rounded-lg mr-3">
            <User2 className="h-4 w-4 text-white" />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">
              Join Domino's Rewards
            </div>
            <div className="text-xs text-gray-500">
              Save your profile to unlock offers and faster checkout
            </div>
          </div>

        </div>

      </div>


      {/* Form */}
      <div className="space-y-3">

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Your Name"
            value={profile.name}
            onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full h-10 px-3 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31837]"
          />
        </div>


        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            Email Address
          </label>

          <input
            type="email"
            placeholder="name@example.com"
            value={profile.email}
            onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full h-10 px-3 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31837]"
          />
        </div>


        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            Mobile Number
          </label>

          <input
            type="tel"
            placeholder="+91 ..."
            value={profile.mobile}
            onChange={(e) => setProfile((prev) => ({ ...prev, mobile: e.target.value }))}
            className="w-full h-10 px-3 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#E31837]"
          />
        </div>

      </div>


      {/* CTA */}
      <button
        className="w-full mt-4 bg-[#006491] text-white h-11 text-xs font-semibold rounded-xl shadow-md transition active:scale-[0.98]"
        onClick={handleProfileUpdate}
      >
        Save Profile & Activate Rewards
      </button>


      {/* Helper text */}
      <div className="text-[10px] text-gray-400 text-center mt-2">
        By joining, you agree to receive Domino's offers and order updates.
      </div>

    </>
  )}

</div>
          
      {/* Feedback Section */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md mx-3 mt-4 p-4 font-poppins">

  {feedbackSubmitted ? (

    <div className="text-center py-6 bg-green-50 rounded-xl border border-green-100">

      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <div className="text-sm font-semibold text-gray-900 mb-1">
        Thanks for your feedback!
      </div>

      <div className="text-xs text-gray-500">
        Your input helps us improve every Domino's experience.
      </div>

    </div>

  ) : (

    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center">

          <div className="bg-[#E31837] p-2 rounded-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white"
              fill="currentColor"
            >
              <path d="M11.5 2C7 2 3.5 5.3 3.5 9.5c0 2.4 1.2 4.4 3.1 5.7L6 22l5.1-2.6c.5.1 1 .1 1.5.1 4.5 0 8-3.3 8-7.5S16 2 11.5 2z"/>
            </svg>
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            Rate Your Pizza Experience
          </h3>

        </div>

      </div>


      {/* Pizza Rating */}
      <div className="flex justify-center gap-3 py-1">

        {[1,2,3,4,5].map((pizza) => (

          <button
            key={pizza}
            onClick={() => {
              setRating(pizza)
              setSelectedTags([])
            }}
            className="transition-transform active:scale-90"
          >

            <span
              className={`text-3xl ${
                pizza <= rating ? "opacity-100" : "opacity-30"
              }`}
            >
              🍕
            </span>

          </button>

        ))}

      </div>


      {/* Dynamic Feedback Chips */}
      {rating > 0 && (

        <div className="space-y-2">

          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            Tell us more about your order
          </div>

          <div className="flex flex-wrap gap-2">

            {(rating >= 4
              ? [
                  "Great taste",
                  "Hot & fresh pizza",
                  "Fast delivery",
                  "Good value",
                  "Well packaged",
                  "Accurate order",
                ]
              : [
                  "Pizza was cold",
                  "Long delivery time",
                  "Wrong order",
                  "Poor taste",
                  "Packaging issue",
                  "Not good value",
                ]
            ).map((item) => (

              <button
                key={item}
                onClick={() =>
                  setSelectedTags((prev) =>
                    prev.includes(item)
                      ? prev.filter((tag) => tag !== item)
                      : [...prev, item]
                  )
                }
                className={`text-[11px] px-3 py-1.5 rounded-full border transition ${
                  selectedTags.includes(item)
                    ? "bg-[#E31837] text-white border-[#E31837]"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      )}


      {/* Optional Comment */}
      <div className="space-y-1">

        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
          Additional Feedback (Optional)
        </label>

        <textarea
          rows={3}
          placeholder="Tell us about your Domino's order"
          className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#E31837] focus:border-[#E31837] outline-none resize-none"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

      </div>


      {/* Submit Button */}
      <button
        className="w-full bg-[#006491] text-white h-10 text-xs font-semibold rounded-xl transition active:scale-[0.98]"
        onClick={handleFeedbackSubmit}
        disabled={!rating}
      >
        Submit Feedback
      </button>


      <p className="text-[10px] text-center text-gray-400">
        Your feedback helps Domino's improve every order.
      </p>

    </div>

  )}

</div>

{/* Just For You - Coupon Section */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md mx-3 mt-4 p-4 font-poppins">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">

    <div className="flex items-center">

      <div className="bg-[#E31837] p-2 rounded-lg mr-3">
        <Sparkles className="h-4 w-4 text-white" />
      </div>

      <h3 className="text-base font-semibold text-gray-900">
        Just for You
      </h3>

    </div>

  </div>


  {/* Inline Toast */}
  {couponToast && (
    <div className="mb-3 text-center text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg py-2">
      ✓ Coupon copied
    </div>
  )}


  <div className="space-y-3">

    {/* Coupon 1 */}
    <button
      onClick={() => copyCoupon("GET30")}
      className="w-full bg-[#F4F8FB] border border-[#DDEAF2] rounded-xl p-3 text-left active:scale-[0.99]"
    >

      <div className="flex items-center justify-between">

        <div>
          <h4 className="text-sm font-semibold text-gray-900">
            ₹30 Off Your Next Pizza
          </h4>

          <p className="text-[11px] text-gray-500">
            Use code <span className="font-bold text-[#E31837]">GET30</span>
          </p>
        </div>

        <div className="text-xl">🍕</div>

      </div>

    </button>


    {/* Coupon 2 */}
    <button
      onClick={() => copyCoupon("CHEESE20")}
      className="w-full bg-[#F4F8FB] border border-[#DDEAF2] rounded-xl p-3 text-left active:scale-[0.99]"
    >

      <div className="flex items-center justify-between">

        <div>
          <h4 className="text-sm font-semibold text-gray-900">
            20% Off Cheese Burst Pizza
          </h4>

          <p className="text-[11px] text-gray-500">
            Use code <span className="font-bold text-[#E31837]">CHEESE20</span>
          </p>
        </div>

        <div className="text-xl">🧀</div>

      </div>

    </button>


    {/* Coupon 3 */}
    <button
      onClick={() => copyCoupon("FREEGB")}
      className="w-full bg-[#F4F8FB] border border-[#DDEAF2] rounded-xl p-3 text-left active:scale-[0.99]"
    >

      <div className="flex items-center justify-between">

        <div>
          <h4 className="text-sm font-semibold text-gray-900">
            Free Garlic Bread
          </h4>

          <p className="text-[11px] text-gray-500">
            Use code <span className="font-bold text-[#E31837]">FREEGB</span>
          </p>
        </div>

        <div className="text-xl">🥖</div>

      </div>

    </button>

  </div>


  {/* CTA */}
  <a
    href="https://www.dominos.co.in/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="w-full mt-4 bg-[#006491] text-white h-10 text-xs font-semibold rounded-xl transition active:scale-[0.98]">
      Order Domino's
    </button>
  </a>


  <p className="mt-2 text-[9px] text-center text-gray-400">
    Tap a coupon to copy the code. Offers may vary by location.
  </p>

</div>

         {/* Receipt Actions */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md mx-3 mt-4 p-4 font-poppins">

  <div className="grid grid-cols-3 gap-3">

    {/* Order History */}
    <button
      ref={historyButtonRef}
      onClick={handleTransactionHistoryOpen}
      className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl py-3 active:scale-[0.98]"
    >
      <History className="h-5 w-5 text-[#006491] mb-1" />
      <span className="text-[11px] font-medium text-gray-700">
        Orders
      </span>
    </button>


    {/* Email Receipt */}
    <button
      onClick={handleEmailReceipt}
      className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl py-3 active:scale-[0.98]"
    >
      <Mail className="h-5 w-5 text-[#006491] mb-1" />
      <span className="text-[11px] font-medium text-gray-700">
        Email
      </span>
    </button>


    {/* Download Receipt */}
    <button
      onClick={handleDownloadReceipt}
      className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl py-3 active:scale-[0.98]"
    >
      <Download className="h-5 w-5 text-[#006491] mb-1" />
      <span className="text-[11px] font-medium text-gray-700">
        Download
      </span>
    </button>

  </div>

</div>
          
       {/* Need Help Section */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md mx-3 mt-4 p-4 font-poppins">

  {/* Header */}
  <div className="flex items-center mb-3">

    <div className="bg-[#E31837] p-2 rounded-lg mr-3">
      <Send className="h-4 w-4 text-white" />
    </div>

    <h3 className="text-sm font-semibold text-gray-900">
      Domino's Support
    </h3>

  </div>


  <div className="grid grid-cols-3 gap-3">

    {/* Chat */}
    <button
      onClick={handleWhatsApp}
      className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl py-3 active:scale-[0.98]"
    >
      <MessageSquare className="h-5 w-5 text-[#006491] mb-1" />
      <span className="text-[11px] font-medium text-gray-700">
        Chat
      </span>
    </button>


    {/* Call */}
    <button
      onClick={handleCall}
      className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl py-3 active:scale-[0.98]"
    >
      <Phone className="h-5 w-5 text-[#006491] mb-1" />
      <span className="text-[11px] font-medium text-gray-700">
        Call
      </span>
    </button>


    {/* Email */}
    <button
      onClick={handleEmail}
      className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl py-3 active:scale-[0.98]"
    >
      <Mail className="h-5 w-5 text-[#006491] mb-1" />
      <span className="text-[11px] font-medium text-gray-700">
        Email
      </span>
    </button>

  </div>

</div>

      {/* Social Media & Store Details */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-md mx-3 mt-4 p-4 font-poppins">

  {/* Header */}
  <div className="flex items-center mb-4">

    <div className="bg-[#E31837] p-2 rounded-lg mr-3">
      <Share2 className="h-4 w-4 text-white" />
    </div>

    <h3 className="text-sm font-semibold text-gray-900">
      Stay Connected
    </h3>

  </div>


  {/* Social Links */}
  <div className="flex justify-center space-x-6 mb-4">

    {/* Instagram */}
    <button
      onClick={() => handleSocialLink("https://www.instagram.com/dominos_india")}
      className="flex flex-col items-center"
    >
      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center mb-1">
        <Instagram className="h-4 w-4 text-white" />
      </div>
      <span className="text-[11px] font-medium text-gray-700">Instagram</span>
    </button>


    {/* Facebook */}
    <button
      onClick={() => handleSocialLink("https://www.facebook.com/DominosPizzaIndia")}
      className="flex flex-col items-center"
    >
      <div className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center mb-1">
        <Facebook className="h-4 w-4 text-white" />
      </div>
      <span className="text-[11px] font-medium text-gray-700">Facebook</span>
    </button>


    {/* Website */}
    <button
      onClick={() => handleSocialLink("https://www.dominos.co.in")}
      className="flex flex-col items-center"
    >
      <div className="w-9 h-9 rounded-full bg-[#E31837] flex items-center justify-center mb-1">
        <ExternalLink className="h-4 w-4 text-white" />
      </div>
      <span className="text-[11px] font-medium text-gray-700">Website</span>
    </button>

  </div>


  {/* Store Location */}
  <div className="text-xs text-gray-600 text-center mb-3 bg-gray-50 p-3 rounded-xl">

    <button
      onClick={() => setShowStoreLocation(!showStoreLocation)}
      className="w-full flex items-center justify-center mb-2 hover:text-[#E31837] transition-colors"
    >
      <MapPin className="h-3 w-3 mr-1 text-[#E31837]" />
      <span className="font-semibold text-[#006491]">
        Domino's Brigade Road, Bengaluru {showStoreLocation ? "▲" : "▼"}
      </span>
    </button>

    {showStoreLocation && (
      <div className="space-y-0.5">
        <p className="font-semibold text-gray-900">Domino's Pizza</p>
        <p>Brigade Road</p>
        <p>Bengaluru, Karnataka 560001</p>
        <p>India</p>

        <p className="mt-2 text-[10px]">
          GSTIN: 29ABCDE1234F1Z5
        </p>

        <p className="mt-1 text-[#006491] font-semibold">
          Store Manager: {currentReceipt.associate}
        </p>
      </div>
    )}

  </div>


  {/* Terms */}
  <button
    className="w-full text-xs text-gray-500 hover:text-[#E31837] h-6 font-medium"
    onClick={() => setShowTerms(!showTerms)}
  >
    Terms & Conditions {showTerms ? "▲" : "▼"}
  </button>

  {showTerms && (
    <div className="text-[11px] text-gray-500 mt-2 space-y-1 px-2 font-medium">

      <p>• Domino's offers and coupons are subject to availability and store participation.</p>
      <p>• Offers may vary by location and delivery zone.</p>
      <p>• Prices include applicable GST.</p>
      <p>• For support visit www.dominos.co.in/support.</p>

    </div>
  )}


  {/* Powered by RDEP */}
  <div className="text-center mt-3 pt-3 border-t border-gray-100">

    <div className="flex items-center justify-center space-x-1">

      <span className="text-xs text-gray-400 font-medium">
        Powered by
      </span>

      <a
        href="https://www.rdep.io"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center"
      >
        <Image
          src="/images/design-mode/RDEP%20cropped.png"
          alt="RDEP"
          width={60}
          height={16}
          className="object-contain"
        />
      </a>

    </div>

  </div>

</div>
          <div id="height-marker" style={{ height: "1px" }} />
        </div>

        {/* Feedback Modal */}
        {showFeedbackModal && (
          <div
            style={getModalPositionRelativeToContainer(feedbackButtonRef)}
            className="bg-white rounded-lg w-full overflow-hidden shadow-xl z-[9999] max-w-sm"
          >
            <div className="flex justify-between items-center p-4 border-b bg-blue-700 text-white">
              <h3 className="text-lg font-semibold">How was your shopping experience?</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white"
                onClick={() => setShowFeedbackModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>

            <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
              {[
                { key: "service", label: "Service Quality" },
                { key: "quality", label: "Product Quality" },
                { key: "style", label: "Shoe Style/Design" },
                { key: "pricing", label: "Value for Money" },
                { key: "store", label: "Store Ambiance" },
              ].map((category) => (
                <div key={category.key} className="flex items-center justify-between">
                  <span className="text-sm">{category.label}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          setFeedback((prev) => ({
                            ...prev,
                            [category.key as keyof typeof feedback]: star,
                          }))
                        }
                      >
                        <Star
                          className={`h-5 w-5 ${
                            feedback[category.key as keyof typeof feedback] >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              <Textarea
                placeholder="Please share your feedback about your purchase (optional)"
                className="mt-2"
                value={feedback.comments}
                onChange={(e) => setFeedback((prev) => ({ ...prev, comments: e.target.value }))}
              />
            </div>

            <div className="p-4 border-t">
              <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white" onClick={handleFeedbackSubmit}>
                Submit Feedback
              </Button>
            </div>
          </div>
        )}

        {/* Transaction History Modal */}
{showTransactionHistory && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center">

    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setShowTransactionHistory(false)}
    />

    {/* Modal */}
    <div className="relative bg-white rounded-2xl w-full max-w-sm mx-4 shadow-2xl border border-gray-200 font-poppins overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">

        <div className="flex items-center">

          <div className="bg-[#E31837] p-2 rounded-lg mr-3">
            <History className="h-4 w-4 text-white" />
          </div>

          <h3 className="text-sm font-semibold text-gray-900">
            Order History
          </h3>

        </div>

        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          onClick={() => setShowTransactionHistory(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-gray-500"
          >
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

      </div>


      {/* Transaction List */}
      <div className="max-h-80 overflow-y-auto p-4 space-y-3">

        {transactionHistory.map((transaction) => (

          <button
            key={transaction.id}
            onClick={() => {
              setCurrentReceiptId(transaction.id)
              setShowTransactionHistory(false)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="w-full flex items-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#E31837] transition"
          >

            <div className="bg-white border border-gray-200 p-2 rounded-lg mr-3">
              <FileText className="h-4 w-4 text-[#006491]" />
            </div>

            <div className="flex-grow text-left">

              <div className="text-sm font-semibold text-gray-900">
                Domino's
              </div>

              <div className="text-[11px] text-gray-500">
                {transaction.date}
              </div>

            </div>

            <div className="text-sm font-semibold text-[#006491]">
              ₹{transaction.amount.toFixed(2)}
            </div>

          </button>

        ))}

      </div>

    </div>

  </div>
)}
        {/* Refer & Earn Modal */}
        {showReferModal && (
          <div
            style={getModalPositionRelativeToContainer(referButtonRef)}
            className="bg-white rounded-lg w-full overflow-hidden shadow-xl z-[9999] max-w-sm"
          >
            <div className="flex justify-between items-center p-4 border-b bg-blue-700 text-white">
              <h3 className="text-lg font-semibold flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Refer & Earn
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-blue-600"
                onClick={() => setShowReferModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Share2 className="h-8 w-8 text-blue-700" />
                </div>
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Share & Earn RM50!</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Refer friends to Skechers and both of you get RM50 off your next purchase!
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-xs font-medium text-blue-800 mb-1">Your Referral Code</div>
                <div className="text-lg font-bold text-blue-700 text-center">SKECH{customerName.toUpperCase()}50</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Try Skechers! Use code SKECH${customerName.toUpperCase()}50 for RM50 off!`,
                    )
                    setShowReferModal(false)
                  }}
                >
                  Copy Code
                </Button>
                <Button
                  className="bg-blue-700 hover:bg-blue-800 text-white"
                  onClick={() => {
                    window.open(
                      `https://wa.me/60362032728?text=Try Skechers Malaysia! Use my code SKECH${customerName.toUpperCase()}50 for RM50 off your next purchase!`,
                    )
                    setShowReferModal(false)
                  }}
                >
                  Share Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
