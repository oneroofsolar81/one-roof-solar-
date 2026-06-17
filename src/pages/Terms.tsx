import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SEO } from '../components/SEO';

export const Terms = () => {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, 'pages', 'terms');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setPageData(docSnap.data());
      } catch (e) {
        console.warn("Using offline fallback data for CMS");
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <SEO seo={pageData?.seo || { title: 'Terms & Conditions | Oneroof Solar', metaDescription: 'Please read these terms carefully before entering into an agreement with Oneroof Solar.' }} />
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-brand-100 text-brand-600 rounded-2xl mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Please read these terms carefully before entering into an agreement with Oneroof Solar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 leading-relaxed [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-4 [&>ul]:mb-6 [&>ul]:pl-6 [&>ul>li]:mb-2 [&>ul>li]:list-none"
        >
          <div className="p-4 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 font-medium mb-8">
            <p className="m-0">
              THIS CONTRACT IS SUBJECT TO A 10 WORKING DAYS COOLING OFF PERIOD. YOU ARE ENTITLED TO AND WILL RECEIVE A WRITTEN COPY OF THIS CONTRACT. YOU ARE ABOUT TO ENTER A LEGALLY BINDING AGREEMENT. PLEASE TAKE A FEW MINUTES TO READ THESE TERMS AND CONDITIONS.
            </p>
          </div>

          <h3>1) Formation of Agreement</h3>
          <p>
            The Agreement is formed between You and the Seller. Once we receive the part payment and you have properly completed and signed the quotation, then that part payment is proof of your agreement to be bound by the Terms and Conditions.
          </p>

          <h3>2) Purchase Agreement</h3>
          <p>
            2.1 In consideration of payment of the Price the Seller sells to You, Customer buys from the Seller the Goods in accordance to the Terms and Conditions and in Consideration that You:
          </p>
          <ul>
            <li>(a) Agree to purchase and make full payment of the Solar Panels and associated equipment.</li>
            <li>(b) Assign to the Seller all of your rights to receive all STC'S.</li>
            <li>(c) Fully complete all documentation necessary for the Seller to gain the right referred to in Clause 2.1 (b).</li>
          </ul>

          <h3>3) Site Inspection</h3>
          <p>
            3.1 The Seller will rely on your answers to the questions concerning the nature of the premises and your eligibility to certain Government Incentives and Rebates in calculating the Price.
          </p>
          <p>
            3.2 You grant permission for the Seller and its Employees, Contractors and Sales Agents to enter the premises where the goods are proposed to be installed at any reasonable time after giving reasonable notice.
          </p>

          <h3>4) Quotation</h3>
          <p>
            4.1 At the time of the formation of this agreement the Seller has provided you a Quotation that included the amount that must be paid by You in order to secure the supply of goods.
          </p>
          <p>
            4.2 Your Quotation may be subject to change if you have provided us with incorrect or inaccurate information.
          </p>

          <h3>5) Payment</h3>
          <p>
            5.1 You agree to pay the Seller a deposit via EFT, Cheque, Cash OR credit card upon the formation of this agreement. The deposit will be 10% of the Price.
          </p>
          <p>
            5.2 You agree to pay the full amount owing to the Seller on or before the installation of goods at the premises.
          </p>
          <p>
            5.3 All amounts payable under this agreement may be made by Bank Cheque, Cash, EFT or Credit Card and will only be accepted as paid, when the Seller receives cleared funds.
          </p>

          <h3>6) Installation</h3>
          <p>
            6.1 We take reasonable care to ensure that competent, trained and Insured Installers install the goods.
          </p>
          <p>
            6.2 You agree that you will be present at the premises for the installation of Goods.
          </p>
          <p>
            6.3 The Seller may at any time sub contract or assign any right or obligation under this agreement for the purpose of providing the services. If, the Seller sub contracts any of the services the Seller warrants that it remains fully responsible for the services.
          </p>
          <p>
            6.4 Seller will arrange (via contractors, employees and installers) the installation on your behalf of your solar PV System through CEC Accredited solar designer/installers and fully licenced electricians according to the relevant Australian standards.
          </p>
          <p>
            6.5 Standard installation, testing and commissioning will be performed by installers in accordance with AS 4777. and ASNZS3100.
          </p>
          <p>
            6.6 Testing and commissioning documentation will be provided in accordance with AS4777 and AS4509.
          </p>
          <p>
            6.7 All design, installation and commissioning is to be carried out by CEC accredited designers and installers for the RECs rebate.
          </p>

          <h3>7) Installation Charges</h3>
          <p>
            7.1 You acknowledge and agree that the seller may determine additional installation charges that may be applicable if:
          </p>
          <ul>
            <li>(a) Any information that you have given the Seller is incorrect or inaccurate.</li>
            <li>(b) Additional parts must be added in order to complete Installation.</li>
            <li>(c) Any changes have occurred at the premises since the site inspection.</li>
            <li>(d) If the customer's switchboard does not comply with the current safety standards or otherwise requires upgrading or replacing, then the Customer must get their own electrician for the upgrade or replacement of switchboard. Our pricing does not include switchboard upgrade costs.</li>
          </ul>

          <h3>8) STC Government Rebate & Other Incentives</h3>
          <p>
            8.1 The quote is given on the basis that the STC's and any other incentives, which are applicable, are still available upon the installation date as these rebates fluctuate from to time.
          </p>
          <p>
            8.2 You agree that the STC discount has been provided to you by the Seller upfront in exchange for you assigning to us the right to create STC's.
          </p>
          <p>
            8.3 You agree to forfeit all rights relating to STC's to the Seller that may arise in relation to the Goods.
          </p>
          <p>
            8.4 The Seller is not responsible for any inaccuracies or for any losses caused by third parties or changes to Government Assistance Schemes, Feed in Tariffs or other programs.
          </p>
          <p>
            8.5 Information regarding government assistance schemes, Feed in Tariffs and other programs is believed to be correct at the time of publication, but this information can change at any time.
          </p>

          <h3>9) Failure to assign STC's</h3>
          <p>
            9.1 If a breach occurs in 8.1, 8.2 and 8.3 the following will apply:
          </p>
          <ul>
            <li>(a) The full payment amount will be increased for the value of the STC'S as determined by us. And we will provide you with a notice in writing for the amount of the increase and amended full payment.</li>
            <li>(b) If installation has not taken place then you must pay the Seller the amended full payment amount, which will have no STC's discount before proceeding with the application.</li>
            <li>(c) If the installation of the goods has been completed, you will then be required to pay us the value of the STC's discount that we have given you if you fail to do this we may enter your premises and remove the goods during business hours on giving written notice of our intention to do so, you will also forfeit any previous payment in which you have made to recover any cost which the Seller has incurred. If previous payment does not recover all costs you will be liable to pay additional costs.</li>
          </ul>

          <h3>10) Warranty</h3>
          <p>
            10.1 Goods manufactured by the Seller are subjected to the warranties, which are set out in the quote or documentation provided at the time of installation.
          </p>
          <p>
            10.2 Goods manufactured by parties other than the Seller are subjected to the manufacturers warranties, which are set out in the Quotation.
          </p>
          <p>
            10.3 In relation to goods manufactured by parties other than the Seller, the Seller reserves the right to refer warranty claims directly to the manufacturer. The Seller shall not be bound by nor be responsible for any other, condition or warranty given by the manufacturer of the goods.
          </p>
          <p>
            10.4 Notification of defects must be made in writing to the Seller within the warranty period.
          </p>
          <p>
            10.5 In the event of a claim, the Seller will decide on the course of action to be taken.
          </p>
          <p>
            10.6 The Seller shall not be liable for any indirect or consequential loss or damage arising from any fault with our workmanship.
          </p>
          <p>
            10.7 It is Your responsibility to provide proof of the initial installation of the product for warranty purpose.
          </p>
          <p>
            10.8 Any manual that is supplied with the product by the manufacturer will be provided by contacting the Seller.
          </p>

          <h3>11) Power Grid Connection and Meter Charges</h3>
          <p>
            11.1. We agree to assist you with the coordination and installation of the utility meter with Power & Water, with the client paying all required utility fees including any variations the utility may require.
          </p>
          <p>
            11.2 The approximate time from solar installation to meter installation is 6 weeks. During this time, any power exported to the grid will not receive any financial credit and the customer accepts this process and will not pursue the company for any financial losses occurred during this time.
          </p>

          <h3>12) Cancellations and Cooling Off Period</h3>
          <p>
            12.1 The Seller may cancel this agreement at any time if You fail to comply with the Sellers terms and conditions.
          </p>
          <p>
            12.2 If the Seller cancels this agreement for direct breach of the Sellers terms and conditions You will have to pay costs associated with delivery or partial installation of goods if relevant.
          </p>
          <p>
            12.3 If the agreement is cancelled under Clause 12.1 the Seller will return to you the payment amount you have made within 90 days of the cancellation of the agreement.
          </p>
          <p>
            12.4 If sale has been conducted through means via a call centre, the contract is subject to a 10-day cooling off period. Should you wish to cancel the contract, a written notice must be given before any deposit is refunded.
          </p>

          <h3>13) Do Not Call Register</h3>
          <p>
            By providing your telephone number, you warrant that you are the relevant telephone account holder (or their nominee) within the meaning of the Do Not Call Register Act 2006 (Cth). You hereby consent to being contacted by telephone in relation to the Seller of goods and services and such consent is to continue indefinitely.
          </p>

          <h3>14) Inclusions</h3>
          <p>
            14.1 All hardware, cable and accessories are provided by the Seller for mounting, wiring and connection of product.
          </p>
          <p>
            14.2 The Seller will arrange the ordering, delivery and installation on Your behalf for all PV components which meet all relevant Australian Standards and suitable to meet the technical requirements of CEC guidelines.
          </p>

          <h3>15) Privacy</h3>
          <p>
            15.1 You agree to supply the Seller with any information necessary to complete documents required for connection of the system (if it is a solar photovoltaic system) to the electricity grid and to claim Your STC's.
          </p>
          <p>
            15.2 You authorise the Seller to share this information (to the extent that is necessary) with its contractors, employees and installers and with relevant government agencies and electricity retailers.
          </p>
          <p>
            15.3 The Seller will not release your personal information to any other parties without your written consent.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
