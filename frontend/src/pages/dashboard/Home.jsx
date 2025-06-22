"use client"

import {
  BarChart,
  Wallet,
  DollarSign,
  TrendingUp,
  Link,
  Award,
  Copy,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Target,
  CreditCard,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Separator } from "../../components/ui/separator"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import Loader from "../../components/dashboard/Loader"
import UpdateWalletAddressModal from "../../components/dashboard/home/UpdateWalletAddressModal"
import WithdrawalModal from "../../components/dashboard/home/WithdrawalModal"
import dashboardService from "../../services/dashboardService"
import userService from "../../services/userService"
import TransferModal from "../../components/dashboard/home/TransferSection"
import { allowedTransferId, disbledUserIds } from "../../constants/tokens"
import CryptoPrice from "../../components/dashboard/home/CryptoPrice"

export default function Home() {
  const { user, updateUserDetails } = useAuth()
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [balanceVisible, setBalanceVisible] = useState(true)
  const navigate = useNavigate()
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [render, setRender] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState("roi")
  const [allData, setAllData] = useState({
    totalReturns: 0,
    totalInvestment: 0,
    totalWithdrawal: 0,
    totalEarning: 0,
    totalDeposit: 0,
    totalROI: 0,
    totalRNB: 0,
    latestTransactions: [],
    latestROI: [],
    latestRnB: [],
    latestExtraIncome: [],
    toal_voucher_generated: 0,
    isWithdrawalWalletUpdated: JSON.parse(localStorage.getItem("isWithdrawalWalletUpdated")) || false,
    leftBusiness: 0.0,
    rightBusiness: 0.0,
    leftWidth: 0.0,
    rightWidth: 0.0,
    target: 0.0,
    interest_wallet: 0.0,
    binary_career_level: 0,
  })

  useEffect(() => {
    ;(async () => {
      try {
        const updatedUserResponse = await userService.getUserData(user)
        console.log(updatedUserResponse)

        if (updatedUserResponse?.data?.success) {
          updateUserDetails(updatedUserResponse?.data?.data)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        setIsDataLoaded(false)
        const response = await dashboardService.getDashboardData(user)
        const { success, data } = response?.data

        if (success) {
          if (data) {
            const lWidth =
              (Number.parseFloat(data?.left_level_business || 0) /
                Number.parseFloat(data?.binary_next_level_business || 1)) *
              100
            const rWidth =
              (Number.parseFloat(data?.right_level_business || 0) /
                Number.parseFloat(data?.binary_next_level_business || 1)) *
              100

            setAllData((prev) => ({
              ...prev,
              totalInvestment: data?.total_investment,
              totalReturns: Number.parseFloat(data?.total_earning) - Number.parseFloat(data?.total_deposit),
              totalWithdrawal: data?.total_withdrawal,
              totalEarning: data?.total_earning,
              totalDeposit: data?.total_deposit,
              roi_wallet: data?.roi_wallet,
              referral_binary_wallet: data?.referral_binary_wallet,
              interest_wallet: data?.interest_wallet,
              deposit_wallet: data?.total_deposit || 0,
              toal_voucher_generated: data?.toal_voucher_generated,
              isWithdrawalWalletUpdated: data?.isWithdrawalWalletUpdated,
              binary_current_level_name: getLevelName(data?.binary_career_level || 0),
              binary_next_level_name: getLevelName((data?.binary_career_level || 0) + 1),
              totalLeftBusiness: Number.parseFloat(data?.left_business || 0)?.toFixed(2),
              totalRightBusiness: Number.parseFloat(data?.right_business || 0)?.toFixed(2),
              leftBusiness: Number.parseFloat(data?.left_level_business || 0)?.toFixed(2),
              rightBusiness: Number.parseFloat(data?.right_level_business || 0)?.toFixed(2),
              leftWidth: lWidth,
              rightWidth: rWidth,
              target: data?.binary_next_level_business,
              binary_career_level: data?.binary_career_level || 0,
              sponsor_email: data?.sponsor_email,
              sponsor_name: data?.sponsor_name,
            }))
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsDataLoaded(true)
      }
    })()
  }, [render])

  const handleWithdrawSubmit = (e) => {
    e.preventDefault()
    setIsWithdrawalModalOpen(false)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  if (!isDataLoaded) {
    return <Loader />
  }

  const userData = {
    userId: user?.user?.userId,
    name: user?.user?.name,
    balance: `$${Number.parseFloat(allData?.totalInvestment || 0)}`,
    sponsorEmail: allData?.sponsor_email || "No sponsor",
    sponsorName: allData?.sponsor_name || "No sponsor",
    currency: "US Dollar",
    status: "Active",
    referralLinks: {
      left: `https://crownbankers.com/signup?sponsorId=${user?.user?.userId}&position=left`,
      right: `https://crownbankers.com/signup?sponsorId=${user?.user?.userId}&position=right`,
    },
    wallets: {
      deposit: `$${Number.parseFloat(allData?.deposit_wallet || 0).toFixed(2)}`,
      roi: `$${Number.parseFloat(allData?.roi_wallet || 0).toFixed(2)}`,
      rb: `$${Number.parseFloat(allData?.referral_binary_wallet || 0).toFixed(2)}`,
      extraIncome: `$${Number.parseFloat(allData?.interest_wallet || 0).toFixed(2)}`,
      coupons: `$${Number.parseFloat(allData?.toal_voucher_generated || 0).toFixed(2)}`,
    },
    totals: {
      investment: `$${Number.parseFloat(allData?.totalInvestment || 0).toFixed(2)}`,
      withdrawal: `$${Number.parseFloat(allData?.totalWithdrawal || 0).toFixed(2)}`,
    },
    career: {
      currentLevel: allData?.binary_career_level || 0,
      nextLevel: allData?.binary_career_level + 1 || 1,
      totalLeftBusiness: `$${Number.parseFloat(allData?.totalLeftBusiness || 0).toFixed(2)}`,
      totalRightBusiness: `$${Number.parseFloat(allData?.totalRightBusiness || 0).toFixed(2)}`,
      leftBusiness: {
        current: `$${Number.parseFloat(allData?.leftBusiness || 0).toFixed(2)}`,
        target: `$${Number.parseFloat(allData?.target || 0).toFixed(2)}`,
      },
      rightBusiness: {
        current: `$${Number.parseFloat(allData?.rightBusiness || 0).toFixed(2)}`,
        target: `$${Number.parseFloat(allData?.target || 0).toFixed(2)}`,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {userData.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Here's your financial overview</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1">
              ID: {userData.userId}
            </Badge>
            <Badge
              variant="default"
              className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              {userData.status}
            </Badge>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Balance</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-2xl font-bold">{balanceVisible ? userData.balance : "••••••"}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="text-white hover:bg-blue-400/20 p-1 h-auto"
                    >
                      {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Wallet className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Investment</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{userData.totals.investment}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Withdrawal</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{userData.totals.withdrawal}</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <ArrowDownRight className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Career Level</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {getLevelName(userData.career.currentLevel)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallets Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Wallet Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">ROI Wallet</p>
                      <div className="p-1 bg-green-100 dark:bg-green-900 rounded">
                        <BarChart className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{userData.wallets.roi}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">R&B Wallet</p>
                      <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded">
                        <Users className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{userData.wallets.rb}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Extra Income</p>
                      <div className="p-1 bg-purple-100 dark:bg-purple-900 rounded">
                        <DollarSign className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{userData.wallets.extraIncome}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Voucher</p>
                      <div className="p-1 bg-yellow-100 dark:bg-yellow-900 rounded">
                        <Target className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{userData.wallets.coupons}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-wrap gap-3 pt-2">
                  {!disbledUserIds?.includes(user?.user?.userId) && (
                    <Button
                      onClick={() => navigate("/dashboard/investments/all-plans")}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Invest
                    </Button>
                  )}

                  <Button
                    onClick={() => setIsWithdrawalModalOpen(true)}
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
                  >
                    <ArrowDownRight className="h-4 w-4 mr-2" />
                    Withdraw
                  </Button>

                  {allowedTransferId === user?.user?.userId && (
                    <Button
                      onClick={() => setIsTransferModalOpen(true)}
                      variant="outline"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20"
                    >
                      Transfer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Crypto Price Component */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <CryptoPrice />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Account Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">User ID</span>
                    <span className="text-sm font-medium">{userData.userId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Name</span>
                    <span className="text-sm font-medium">{userData.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {userData.status}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <UpdateWalletAddressModal />
              </CardContent>
            </Card>

            {/* Career Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Career Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current Level</p>
                    <p className="text-sm font-semibold">{getLevelName(userData.career.currentLevel)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Next Level</p>
                    <p className="text-sm font-semibold">{getLevelName(userData.career.currentLevel + 1)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Left Business</span>
                      <span className="text-sm font-medium">
                        {userData.career.leftBusiness.current} / {userData.career.leftBusiness.target}
                      </span>
                    </div>
                    <Progress value={Math.min(allData?.leftWidth || 0, 100)} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Right Business</span>
                      <span className="text-sm font-medium">
                        {userData.career.rightBusiness.current} / {userData.career.rightBusiness.target}
                      </span>
                    </div>
                    <Progress value={Math.min(allData?.rightWidth || 0, 100)} className="h-2" />
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">Total Business</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Left: </span>
                      <span className="font-medium">{userData.career.totalLeftBusiness}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Right: </span>
                      <span className="font-medium">{userData.career.totalRightBusiness}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Referral Links */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Referral Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Left Position Link</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(userData.referralLinks.left)}
                    className="h-8"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                  <p className="text-xs text-gray-600 dark:text-gray-400 break-all">{userData.referralLinks.left}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Right Position Link</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(userData.referralLinks.right)}
                    className="h-8"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                  <p className="text-xs text-gray-600 dark:text-gray-400 break-all">{userData.referralLinks.right}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {isWithdrawalModalOpen && (
        <WithdrawalModal
          isWithdrawalModalOpen={isWithdrawalModalOpen}
          setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
          selectedWallet={selectedWallet}
          allData={allData}
          setRender={setRender}
        />
      )}

      {isTransferModalOpen && (
        <TransferModal
          isTransferModalOpen={isTransferModalOpen}
          setIsTransferModalOpen={setIsTransferModalOpen}
          setRender={setRender}
        />
      )}
    </div>
  )
}

// Helper function to get level name from level number
const getLevelName = (level) => {
  const levelNames = [
    "Starter",
    "Sunstone",
    "Solar Flare",
    "Radiant",
    "Luminous",
    "Photon",
    "Helios",
    "Aurora",
    "Eclipse",
    "Nova",
    "Solaris",
    "Celestial",
  ]

  return level >= 0 && level < levelNames.length ? levelNames[level] : `Level ${level}`
}
